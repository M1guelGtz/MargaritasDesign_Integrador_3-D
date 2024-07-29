import Swal from "sweetalert2";
import Img from "../Atoms/Img";
import Span from "../Atoms/Span";
import Title from "../Atoms/Title";

function CardProductosC(props) {
    
    async function handleClick() {
        const { value: text } = await Swal.fire({
            background: "#FDEBD0",
            title: `${props.text} de ${props.tipo}`,
            width:"30%",
            html: `
                <div className='w-20'>
                    <img  src="Prod1.jpg"/>
                </div >
                <span>$${props.precio}</span><br/><br/>
                <span>Cantidad en existencia: ${props.cantidad}</span><br/><br/>
                <span>${props.descripcion}</span>`,
            confirmButtonText: "Agregar al carrito",
            confirmButtonColor: "black",
        });
        if (text) {
            Swal.fire({
                background: "#FDEBD0",
                icon: "success",
                title: "Producto agregado al carrito",
                width:"30%",
                confirmButtonColor: "black",
            })
            fetch(`${import.meta.env.VITE_URL_BACKEND}/carrito_productos`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${sessionStorage.getItem("token")}`,
                    'Access-Control-Allow-Origin':'*'
                },
                body: JSON.stringify({
                    "carrito_id": props.id_car,
                    "producto_id": props.id,
                    "cantidad": 1
                })
            }).then(
                response => {
                    if(response.ok){
                        return response.json()
                    }
                }
            ).then(
                data => {
                }
            ).catch(error =>{
                console.log(error)
            })
        }
    }
    return (
        <div onClick={handleClick} className={props.style + "mx-auto  grid phone:w-3/4 tablet:w-full laptop:w-10/12 phone:grid-cols-2  border-2 border-[#FC9939] rounded-3xl bg-[#482D2E]"}>
            <div className="w-5/6 box-border mx-auto"><Img img={`https://margaritasdesignapi.integrador.xyz/uploads/${props.src}`}></Img></div>
            <div className="h-full flex flex-col items-center justify-around">
                <Title text={`${props.text} de ${props.tipo}`} style='text-[#ffffff]'></Title>
                <span className="text-4xl text-[#ffffff]" span>${props.precio}</span>
                <Span span={`En existencia: ${props.cantidad}`} style='text-[#ffffff]'></Span>
            </div>
        </div>
    );
}

export default CardProductosC;
