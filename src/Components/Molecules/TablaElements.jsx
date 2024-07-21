import Celda from "../Atoms/Celda";

function TablaElements(props){
    return(
            <div className="w-full flex flex-row justify-evenly h-12  bg-gray-400 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-200 saturate-100 backdrop-contrast-100">
                <Celda text={props.uno}></Celda>
                <Celda text={props.dos}></Celda>
                <Celda text={props.tres}></Celda>
                <Celda text={props.cinco}></Celda>
                <Celda text={props.cuatro}></Celda>
                <Celda text='Detalles'></Celda>
            </div>
    )
}
export default TablaElements;