import { useState } from "react";
import Swal from "sweetalert2";
import Img from "../Atoms/Img";
import Span from "../Atoms/Span";
import Text from "../Atoms/Text";
import Title from "../Atoms/Title";
function CardProductos (props) {
    const [data, setData] = useState([]);
    async function handkerClick(){
        const { value: text } = await Swal.fire({
            //------------- * Pantalla modal con info del producto * -----------//
            background: "#FDEBD0",
            title: `${props.text}`,
            html: `
                <span>${props.precio}</span>
                <span>${props.descripcion}</span>`,
            showCancelButton: true,
            cancelButtonText: "<img src='icons8-eliminar-50.png'/>",
            cancelButtonColor:"transparent", 
            confirmButtonText: "<img src='icons8-editar-50.png'/>",
            confirmButtonColor:"transparent",
        });
        if (text) {
            const { value: formValues,} = await Swal.fire({
                //--------------- * Pantalla modal para editar el producto * -----------
                title: `${props.text}`,
                background: "#FDEBD0",
                showCloseButton:"close",
                html: `
                    <input type='number' placeholder='nuevo precio para ${props.text}' required id="swal-input1" class="swal2-input">
                    <input type='number' placeholder='Agregar a existenia' required id="swal-input2" class="swal2-input">`,
                showCancelButton: true,
                cancelButtonText: "<img src='icons8-cancelar-48.png'/>",
                cancelButtonColor:"transparent",
                confirmButtonText: "<img src='icons8-aceptar-48.png'/>",
                confirmButtonColor:"transparent",
                focusConfirm: false,
                preConfirm: () => {
                return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value
                ]}
            });
            if (formValues) {
                Swal.fire({
                    //------------- * Pantalla modal cambios realizados * -----------//
                    background: "#FDEBD0",
                    title: "Cambios guardados correctamente!",
                    icon: "success"
                })
            }
            return
        }else  {
            const { value: confirm } = await Swal.fire({
                //------------- * Pantalla modal confirmar eliminacio * -----------//
                title: `Seguro que desea eliminar ${props.text}`,
                icon: "warning",
                showCloseButton:"close",
                showCancelButton: true,
                background: "#FDEBD0",
                cancelButtonText:"<img src='icons8-cancelar-48.png'/>" ,
                cancelButtonColor:"transparent",
                confirmButtonText:"<img src='icons8-aceptar-48.png'/>" ,
                confirmButtonColor:"transparent",
            });
            if (confirm){
                fetch(`${import.meta.env.VITE_URL_BACKEND}/productos/${props.id}`,{
                        method: "DELETE",
                    }).then (response => {
                    if(response.ok)
                        return response.json()
                    }).then (datos => {
                        setData(datos)
                        //console.log(data)
                        props.fnVal(!props.val)
                    }).catch(
                        error=>{
                            console.log(error)
                        }
                    )
                Swal.fire({
                    background: "#FDEBD0",
                    title:"Producto eliminado",
                    icon: "success"
                })
                
            }
            return
        }
    }
    return (
        <div onClick={handkerClick}  className="flex cursor-pointer justify-evenly items-center w-5/12 m-5 border border-solid border-black bg-yellow-100 rounded-2xl">
            <div className="w-1/3  ">
                <Img img = 'Productos.png'></Img>
            </div>
            <div className="w-2/3 h-full flex flex-col items-center justify-around">
                <Title text={"ID: "  + props.id + "   " + props.text + ' de ' + props.tipo}></Title>
                <Span span={props.precio} ></Span>
                <Text text={props.descripcion}></Text>
            </div>
        </div>
    )
}
export default CardProductos;