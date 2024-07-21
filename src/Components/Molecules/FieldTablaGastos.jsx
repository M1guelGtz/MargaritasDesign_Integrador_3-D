import Swal from "sweetalert2";
import Celda from "../Atoms/Celda";
function    FieldTablaGastos(props){
    async function handkerClick(){
        let nombre, telefono, direccion, correo, descripcion
        const { value: text } = await Swal.fire({
            //------------- * Pantalla modal con info del producto * -----------//
            background: "#FDEBD0",
            title: `${props.id + ') ' +props.descripcion }`,
            html: `
                <span>Total: $${props.precio}</span><br><br>
                <span>Fecha: ${props.nombre}</span>`,
            showCancelButton: true,
            cancelButtonText: "<img src='icons8-eliminar-50.png'/>",
            cancelButtonColor:"transparent", 
            confirmButtonText: "<img src='icons8-editar-50.png'/>",
            confirmButtonColor:"transparent",
            width: '30%'
        });
        if (text) {
            const { value: formValues,} = await Swal.fire({
                //--------------- * Pantalla modal para editar el producto * -----------
                title: `Compra realizada la fecha: ${props.nombre}`,
                background: "#FDEBD0",
                showCloseButton:"close",
                html: `
                    <div class="form-group">
                        
                        <label for="swal-input9">Total:
                            <input type='number' value='${props.precio}' required id="swal-input7" class="swal2-input">
                        </label><br/>
                        <label for="swal-input10">Detalles:
                            <input type='text' value='${props.descripcion}' required id="swal-input10" class="swal2-input">
                        </label>`,
                showCancelButton: true,
                cancelButtonText: "<img src='icons8-cancelar-48.png'/>",
                cancelButtonColor:"transparent",
                confirmButtonText: "<img src='icons8-aceptar-48.png'/>",
                confirmButtonColor:"transparent",
                focusConfirm: false,
                preConfirm: () => {
                    telefono=Number(document.getElementById("swal-input7").value)
                    descripcion = document.getElementById("swal-input10").value
                }
            });
            if (formValues) {
                Swal.fire({
                    //------------- * Pantalla modal cambios realizados * -----------//
                    background: "#FDEBD0",
                    title: "Cambios guardados correctamente!",
                    icon: "success"
                })
                fetch(`${import.meta.env.VITE_URL_BACKEND}/gastos/${props.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        "Authorization": `${sessionStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        "detalles": descripcion,
                        "total": telefono,
                        "id_admin": 3
                    }),
                })
                props.fnVal(!props.val)
                
            }
            return
        }else  {
            const { value: confirm } = await Swal.fire({
                //------------- * Pantalla modal confirmar eliminacio * -----------//
                title: `Seguro que desea eliminar "${props.descripcion}"`,
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
                fetch(`${import.meta.env.VITE_URL_BACKEND}/gastos/${props.id}`,{
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            "Authorization": `${sessionStorage.getItem("token")}`,
                            },
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
                props.fnVal(!props.val)
                
            }
            return
        }
    }
    
    if(props.id%2){
        return(
            <div onClick={handkerClick} className={props.style}>
                    <Celda  text={props.id}></Celda>
                    <Celda text={props.nombre}></Celda>
                    <Celda text={'$'+props.precio}></Celda>
                    <Celda text={props.descripcion}></Celda>
            </div>
        )
    }else{
        return(
            <div onClick={handkerClick} className="cursor-pointer w-full flex justify-evenly bg-gray-200">
                    <Celda  text={props.id}></Celda>
                    <Celda text={props.nombre}></Celda>
                    <Celda text={'$'+props.precio}></Celda>
                    <Celda text={props.descripcion}></Celda>
            </div>
        )
    }
}
export default FieldTablaGastos;