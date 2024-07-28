import Swal from "sweetalert2";
import Img from "../Components/Atoms/Img";
import Span from "../Components/Atoms/Span";
import Title from "../Components/Atoms/Title";
function CardProductosCarrito ( props ){
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
                confirmButtonText: "Quitar del carrito",
                confirmButtonColor: "red",
            });
        if (text) {
            Swal.fire({
                background: "#FDEBD0",
                icon: "success",
                title: "Producto eliminado del carrito",
                width:"30%",
                confirmButtonColor: "black",
            })
            props.fnVal(!props.val)
            fetch(`${import.meta.env.VITE_URL_BACKEND}/carrito_productos/${props.id}`,{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${sessionStorage.getItem("token")}`,
                    'Access-Control-Allow-Origin':'*'
                },
                
            }).then(
                response => {
                    if(response.ok){
                        return response.json()
                    }
                }
            ).then(
                data => {
                    console.log(data)
                }
            ).catch(error =>{
                console.log(error)
            })
        }
    }
    return (
        <div onClick={handleClick} className={props.style + "mx-auto grid phone:w-3/4 tablet:w-full m-5 laptop:w-10/12 phone:grid-cols-2   bg-[#e9bf26]"}>
            <div className="w-5/6 box-border mx-auto"><Img img={`https://margaritasdesignapi.integrador.xyz/uploads/${props.src}`}></Img></div>
            <div className="h-full flex flex-col items-center justify-around">
                <Title text={`${props.text} de ${props.tipo}`} style=''></Title>
                <span className="text-4xl " span>${props.precio}</span>
                <Span span={`Cantidad: ${props.cantidad}`} style=''></Span>
            </div>
        </div>
    );
}
export default CardProductosCarrito;