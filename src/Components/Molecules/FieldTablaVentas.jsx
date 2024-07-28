import Celda from "../Atoms/Celda";
function FieldTablaVentas(props){
    if(props.id%2){
        return(
            <div /*onClick={handkerClick} */className={props.style}>
                    <Celda  text={props.id}></Celda>
                    <Celda text={props.nombre}></Celda>
                    <Celda text={props.cantidad}></Celda>
                    <Celda text={'$'+props.precio}></Celda>
                    <Celda text={null} data={props.descripcion}></Celda>
            </div>
        )
    }else{
        return(
            <div /*onClick={handkerClick} */className="cursor-pointer w-full flex justify-evenly bg-gray-200">
                    <Celda  text={props.id}></Celda>
                    <Celda text={props.nombre}></Celda>
                    <Celda text={props.cantidad}></Celda>
                    <Celda text={'$'+props.precio}></Celda>
                    <Celda text={null} data={props.descripcion}></Celda>
            </div>
        )
    }
}
export default FieldTablaVentas;