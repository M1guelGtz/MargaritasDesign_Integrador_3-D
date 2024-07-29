import Swal from "sweetalert2";
import Img from "../Atoms/Img";
import Span from "../Atoms/Span";
import Title from "../Atoms/Title";

function CardClientes (props) {
        async function handkerClick(){
            const { value: text } = await Swal.fire({
                //------------- * Pantalla modal con info del producto * -----------//
                background: "#FDEBD0",
                title: `${props.text}`,
                html: `
                    <span>id: ${props.id}</span></br>
                    <span> telefono: ${props.telefono}</span></br>
                    <span>id: ${props.correo}</span></br>`,
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
                        <input type='number' placeholder='Agregar a existenia' required id="swal-input2" class="swal2-input">
                        `,
                        
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
                    fetch(`${import.meta.env.VITE_URL_BACKEND}/usuarios/${props.id}`,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `${localStorage.getItem("token")}`,
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({

                        }),
                    }).then (response => {
                    if(response.ok)
                        return response.json()
                    }).then (datos => {
                        props.fnVal(!props.val)
                    }).catch(
                        error=>{
                            console.log(error)
                            Swal.fire({
                                background: "#FDEBD0",
                                title:"No se pudo eliminar el producto",
                                icon: "error"
                            })
                            return 
                        }
                    )
                Swal.fire({
                    background: "#FDEBD0",
                    title:"Producto eliminado",
                    icon: "success"
                })
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
                    fetch(`${import.meta.env.VITE_URL_BACKEND}/usuarios/${props.id}`,{
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": `${localStorage.getItem("token")}`,
                                'Access-Control-Allow-Origin': '*',
                                }
                        }).then (response => {
                        if(response.ok)
                            return response.json()
                        }).then (datos => {
                            //console.log(data)
                            props.fnVal(!props.val)
                        }).catch(
                            error=>{
                                console.log(error)
                                Swal.fire({
                                    background: "#FDEBD0",
                                    title:"No se pudo eliminar el producto",
                                    icon: "error"
                                })
                                return 
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
        <div  className="flex  justify-evenly items-center w-5/12 m-5 bg-gradient-to-r from-[#ffa31ac4]  to-[#ffa31adc] rounded-2xl border-solid border-2   border-black">
            <div className="w-1/3 justify-evenly  items-center flex flex-col">
                <Img img = 'Cliente.png'></Img>
                <Span span={props.text}></Span>
            </div>
            <div className= "border-solid border-l  border-black rounded-e-2xl w-2/3 h-full flex flex-col items-center justify-around">
                <Title text={props.text} style=''></Title>
                <Span span={"Correo: " + props.correo} style=''></Span>
                <Span span={"Telefono: " + props.telefono} style=''></Span>
                <Span span={"Direccion: " + props.direccion} style=''></Span>    
            </div>
        </div>
    )
}
export default CardClientes;