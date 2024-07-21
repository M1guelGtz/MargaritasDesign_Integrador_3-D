import Swal from "sweetalert2";
import Img from "./Img";
import Span from "../Atoms/Span";
import Title from "../Atoms/Title";

function CardProductos(props) {
    
    let precio, cantidad

    async function handleClick() {
        const { value: text } = await Swal.fire({
            background: "#FDEBD0",
            title: `${props.text} de ${props.tipo}`,
            width:"30%",
            html: `
                <span>Id para ${props.text} de ${props.tipo}: ${props.id}</span><br/><br/>
                <span>$${props.precio}</span><br/><br/>
                <span>Cantidad en existencia: ${props.cantidad}</span><br/><br/>
                <span>${props.descripcion}</span>`,
            showCancelButton: true,
            cancelButtonText: "<img src='icons8-eliminar-50.png'/>",
            cancelButtonColor: "transparent",
            confirmButtonText: "<img src='icons8-editar-50.png'/>",
            confirmButtonColor: "transparent",
        });
        if (text) {
            const { value: formValues } = await Swal.fire({
                title: `${props.text} de ${props.tipo}`,
                background: "#FDEBD0",
                
                html: `
                    <label> Precio: <br/>
                        <input type='number' value="${props.precio}"  required id="swal-input1" class="swal2-input">
                    </label><br/><br/>
                    <label> Cantidad a agregar:
                        <input  type='number'   required id="swal-input2" class="swal2-input">
                    </label>`,
                showCancelButton: true,
                cancelButtonText: "<img src='icons8-cancelar-48.png'/>",
                cancelButtonColor: "transparent",
                confirmButtonText: "<img src='icons8-aceptar-48.png'/>",
                confirmButtonColor: "transparent",
                width: "500px",
                focusConfirm: false,
                preConfirm: () => {
                    const nuevoPrecio = document.getElementById("swal-input1").value;
                    const cantidadAAgregar = Number(document.getElementById("swal-input2").value);
                    const nuevaCantidad = Number(props.cantidad) + cantidadAAgregar;
                    precio = (nuevoPrecio);
                    cantidad = (nuevaCantidad)
                },
            });
            if (formValues) {
                Swal.fire({
                    background: "#FDEBD0",
                    title: "¡Cambios guardados correctamente!",
                    icon: "success",
                    width:"30%",
                });
                console.log(precio + " = " + cantidad)
                fetch(`${import.meta.env.VITE_URL_BACKEND}/productos/${props.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `${sessionStorage.getItem("token")}`,
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        "tipo": `${props.tipo}`,
                        "nombre": `${props.text}`,
                        "precio":   Number(precio),
                        "cantidad": Number(cantidad),
                        "acabado": `${props.acabado}`,
                        "id_imagen" : 2,
                    }),
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    props.fnVal(!props.val);
                })
                .catch(error => {
                    console.error('Error al intentar guardar los cambios:', error);
                });
                props.fnVal(!props.val);
            }
        } else {
            const { value: confirm } = await Swal.fire({
                title: `¿Seguro que desea eliminar el producto "${props.text} de ${props.tipo}" de la existencia?`,
                icon: "warning",
                showCancelButton: true,
                background: "#FDEBD0",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "gray",
                confirmButtonText: "Confirmar",
                confirmButtonColor: "red",
                width:"30%",
            });

            if (confirm) {
                fetch(`${import.meta.env.VITE_URL_BACKEND}/productos/${props.id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `${sessionStorage.getItem("token")}`,
                        'Access-Control-Allow-Origin': '*'
                        },
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(datos => {
                    setData(datos);
                    console.log(datos)
                    props.fnVal(!props.val);
                })
                .catch(error => {
                    console.error('Error al intentar eliminar el producto:', error);
                });
                Swal.fire({
                    background: "#FDEBD0",
                    title: "¡Producto eliminado!",
                    icon: "sucggcess",
                });
                props.fnVal(!props.val)
            }
        }
    }

    return (
        <div onClick={handleClick} className={props.style + "mx-auto  grid phone:w-3/4 tablet:w-full laptop:w-10/12 phone:grid-cols-2  border-2 border-[#FC9939] rounded-3xl bg-[#482D2E]"}>
            <div className="w-5/6 box-border mx-auto"><Img img='Prod1.jpeg'></Img></div>
            <div className="h-full flex flex-col items-center justify-around">
                <Title text={`${props.text} de ${props.tipo}`} style='text-[#ffffff]'></Title>
                <span className="text-4xl text-[#ffffff]" span>${props.precio}</span>
                <Span span={`En existencia: ${props.cantidad}`} style='text-[#ffffff]'></Span>
            </div>
        </div>
    );
}

export default CardProductos;
