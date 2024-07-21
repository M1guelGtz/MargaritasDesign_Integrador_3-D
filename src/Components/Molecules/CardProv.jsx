import Swal from "sweetalert2";
import Img from "./Img";
import Span from "../Atoms/Span";
import Title from "../Atoms/Title";
function CardProv(props){
    let nombre=props.nombre, telefono=props.telefono, descripcion=props.descripcion, direccion=props.direccion, correo=props.correo;

    async function handleClick(){
        const { value: text } = await Swal.fire({
            //------------- * Pantalla modal con info del producto * -----------//
            background: "#FDEBD0",
            title: `${props.nombre}`,
            showCloseButton:"close",
            showCancelButton: true,
            width: '30%',
            html: `
                <span>Numero telefonico: ${props.telefono}</span><br/><br/>
                <span>Correo electronico: ${props.correo}</span><br/><br/>
                <span>${props.direccion}</span><br/><br/>
                <span>${props.descripcion}</span>`,
            cancelButtonText: "<img src='icons8-eliminar-50.png'/>",
            cancelButtonColor:"transparent", 
            confirmButtonText: "<img src='icons8-editar-50.png'/>",
            confirmButtonColor:"transparent",
        });
        if (text) {
            const { value: formValues,} = await Swal.fire({
                //--------------- * Pantalla modal para editar el producto * -----------
                title: `Ingrese los datos a editar de "${props.nombre }"`,
                background: "#FDEBD0",
                showCloseButton:"close",
                html: `
                    <div class="form-group">
                        <label for="swal-input6">Nombre
                            <input type='text' value='${props.nombre}' required id="swal-input6" class="swal2-input">
                        </label><br/>
                        <label for="swal-input7">Telefono
                            <input type='number' value='${props.telefono}' required id="swal-input7" class="swal2-input">
                        </label><br/>
                        <label for="swal-input8">Direccion
                            <input type='text'   value='${props.direccion} ' required id="swal-input8" class="swal2-input">
                        </label><br/>
                        <label for="swal-input9">Correo
                            <input type='email' value='${props.correo}' required id="swal-input9" class="swal2-input">
                        </label><br/>
                        <label for="swal-input10">Descripcion
                            <input type='text' value='${props.descripcion}' required id="swal-input10" class="swal2-input">
                        </label>`,
                showCancelButton: true,
                cancelButtonText: "<img src='icons8-cancelar-48.png'/>",
                cancelButtonColor:"transparent",
                confirmButtonText: "<img src='icons8-aceptar-48.png'/>",
                confirmButtonColor:"transparent",
                focusConfirm: false,
                preConfirm: () => {
                    nombre = document.getElementById("swal-input6").value
                    telefono=Number(document.getElementById("swal-input7").value)                
                    direccion = document.getElementById("swal-input8").value
                    correo = document.getElementById("swal-input9").value
                    descripcion = document.getElementById("swal-input10").value
                }
            })
            if(formValues){
                
                fetch(`${import.meta.env.VITE_URL_BACKEND}/proveedores/${props.id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        "telefono": telefono,
                        "nombre": nombre,
                        "descripcion": descripcion,
                        "direccion": direccion,
                        "correo_electronico": correo,
                        "id_admin": 3
                    }),
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    props.fnVal(!props.val)
                })
                .catch(error => {
                    console.error('Error al intentar guardar los cambios:', error);
                });
                Swal.fire({
                    background: "#FDEBD0",
                    title: "¡Cambios guardados correctamente!",
                    icon: "success",
                    width:"30%",
                });
                
            }
            return
        }else  {
            const { value: confirm } = await Swal.fire({
                //------------- * Pantalla modal confirmar eliminacio * -----------//
                title: `Seguro que desea eliminar a "${props.nombre}" de la lista de proveedores`,
                text:'¡Esta accion es irreversible!',
                icon: "warning", 
                showCloseButton:"close",
                showCancelButton: true,
                background: "#FDEBD0",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "gray",
                confirmButtonText: "Confirmar",
                confirmButtonColor: "red",
                width: "30%"
            });
            if (confirm){
                fetch(`${import.meta.env.VITE_URL_BACKEND}/proveedores/${props.id}`,{
                        method: "DELETE",
                        headers: {
                        "Authorization": `${sessionStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                            },
                    }).then (response => {
                    if(response.ok)
                        return response.json()
                    }).then (datos => {
                        setData(datos)
                        console.log(data)
                    }).catch(
                        error=>{
                            console.log(error)
                        }
                    )
                    props.fnVal(!props.val)
                    Swal.fire({
                    background: "#FDEBD0",
                    title:"Producto eliminado",
                    icon: "success"
                })
            }
        }
    }
    return(
        <div onClick={handleClick} className={props.style + "mx-auto  grid phone:w-3/4 tablet:w-full laptop:w-10/12 phone:grid-cols-2  border-2 border-solid border-black rounded-3xl bg-gradient-to-r from-[#ffa31a]  to-[#ffa31a]"}>
            <div className="w-5/6 mx-auto ">
                <Img img='Prod1.jpeg'>{props}</Img>
            </div>
            <div className="h-full flex flex-col items-center justify-around">
                <Title text={props.nombre} style='text-3xl text-black'></Title>
                <span className=" text-black text-center hover:text-orange-600  hover:bg-white w-full hover:items-center hover:flex hover:justify-center p-2 rounded-3xl " span>Telefono: {props.telefono}</span>
                <Span span={props.correo}></Span>
            </div>
        </div>
    )
}

export default CardProv;