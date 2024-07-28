function Celda({data, text}){
    if(text=="Detalles"){
        return(
            <span className=" w-2/6 border-x flex felx-col justify-center items-center border-white border-solid h-full">{text}</span>
        )
    }
    if(text==null){
        return(<div className="w-2/6">
            {
                data!=null ? data.map(element=><span className=" ">{element.cantidad} {element.nombre}s ,</span>): "Vacio"
            }
        </div>
        )
    }
    return(
        <span className=" w-1/6 border-x flex felx-col justify-center items-center border-white border-solid h-full">{text}</span>
    )
}
export default Celda;