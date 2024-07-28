import Swal from "sweetalert2";
import Celda from "../Atoms/Celda";
function FieldTablaPedidos(props){
    async function handkerClick(){
        let pago, envio;
        const { value: text } = await Swal.fire({
            //------------- * Pantalla modal con info del producto * -----------//
            background: "#FDEBD0",
            title: `${props.detalles }`,
            html: `
                <span>ingresos: $${props.total }</span><br><br>
                <span>pago:  ${props.estatus_pago}</span><br><br>
                <span>Envio: ${props.estatus_envio}</span><br><br>
                <span>Para el cliente con id ${props.id_cliente}</span>`,
            showCancelButton: true,
            cancelButtonText: "<img src='icons8-eliminar-50.png'/>",
            cancelButtonColor:"transparent", 
            confirmButtonText: "<img src='icons8-editar-50.png'/>",
            confirmButtonColor:"transparent",
            width: '30%'
        });
        let select
        if(props.estatus_envio === "Completado"){
            select = "selected"
        }
        if (text) {
            const { value: formValues,} = await Swal.fire({
                //--------------- * Pantalla modal para editar el producto * -----------
                title: `${props.detalles}`,
                background: "#FDEBD0",
                showCloseButton:"close",
                html: `
                    <form>
                        <span>Estatus del pago:</span>
                        <select id='pago' className='w-60 border-solid border border-black'>
                            <option value='2'>Seleccione una opcion</option>
                            <option value="0">Pendiente</option>
                            <option value="1"  >Completado</option>
                        </select><br/>
                        <span>Estatus del envio:</span>
                        <select id='envio'>
                            <option value='2'>Seleccione una opcion</option>
                            <option value="0">Pendiente</option>
                            <option value="1" valor=${select} >Completado</option>
                        </select>
                    </form>`,
                showCancelButton: true,
                cancelButtonText: "<img src='icons8-cancelar-48.png'/>",
                cancelButtonColor:"transparent",
                confirmButtonText: "<img src='icons8-aceptar-48.png'/>",
                confirmButtonColor:"transparent",
                focusConfirm: false,
                preConfirm: () => {
                    pago = document.getElementById('pago');
                    pago.addEventListener("change",  ()=>{
                        var selectedOption = this.options[select.selectedIndex];
                        console.log(selectedOption.value + ': ' + selectedOption.text);
                    })
                    envio = document.getElementById('envio');
                    envio.addEventListener("change",  ()=>{
                        var selectedOption = this.options[select.selectedIndex];
                        console.log(selectedOption.value + ': ' + selectedOption.text);
                    })
                }
            });
            if (formValues) {
                if(envio.value!=2 && pago.value != 2){
                    Swal.fire({
                        background: "#FDEBD0",
                        title: `Cambios guardados correctamente!`,
                        icon: "success",
                        text: `${envio.value ==1 && pago.value ==1 ? "pago y envio completados, se enviara a la seccion de ventas": `Pago ${pago.value==1?"completado": "pendiente"} y envio ${envio.value==1?"completado": "pendiente"}`}`
                    })
                    
                    fetch(`${import.meta.env.VITE_URL_BACKEND}/pedidos/${props.id}`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            "Authorization": `${sessionStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({
                            "detalles": props.detalles,
                            "estatus_envio": Number(envio.value),
                            "estatus_pago": Number(pago.value),
                            "total": props.total,
                            "id_admin": 3,
                            "id_cliente": props.id_cliente
                        }),
                    }).then(response => {
                        if (response.ok) {
                            console.log(select.value + " " + selectE.value)
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
                    props.fnVal(!props.val)
                }else{
                    Swal.fire({
                        background: "#FDEBD0",
                        title: "Cambios no guardados",
                        icon: "error", 
                        text: "Debe seleccionar el status para cada opcion, pago y envio a la vez"
                    })
                }
            }
            return
        }else  {
            const { value: confirm } = await Swal.fire({
                //------------- * Pantalla modal confirmar eliminacio * -----------//
                title: `Seguro que desea eliminar ${props.nombre}`,
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
                fetch(`${import.meta.env.VITE_URL_BACKEND}/pedidos/${props.id}`,{
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
                    <Celda  text={props.fecha}></Celda>
                    <Celda text={props.id_cliente}></Celda>
                    <Celda text={props.estatus_envio}></Celda>
                    <Celda text={props.estatus_pago}></Celda>
                    <Celda text={'$' + props.total}></Celda>
                    <Celda text={props.detalles}></Celda>
            </div>
        )
    }else{
        return(
            <div onClick={handkerClick} className="cursor-pointer w-full flex justify-evenly bg-gray-200">
                    <Celda text={props.fecha}></Celda>
                    <Celda text={props.id_cliente}></Celda>
                    <Celda text={props.estatus_envio}></Celda>
                    <Celda text={props.estatus_pago}></Celda>
                    <Celda text={'$' + props.total}></Celda>
                    <Celda text={props.detalles}></Celda>
            </div>
        )
    }
}
export default FieldTablaPedidos;