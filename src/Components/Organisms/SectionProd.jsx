import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardProductos from "../Molecules/CardProductos";

function SectionProd(props){
    const [data, setData] = useState([]);
    const [bandera, setBandera] = useState(false)
    
    useEffect(()=>{
        fetchF("productos")
        },[bandera]
    );
    function fetchF(path){
        fetch(`${import.meta.env.VITE_URL_BACKEND}/${path}`).then (response => {
        if(response.ok)
            return response.json()
        }).then (datos => {
            setData(datos)
            setBandera(true)
            console.log(data)
        }).catch(
            error=>{
                console.log(error)
        })
    }
    return (
        <div>
            <div className=" flex flex-wrap w-full dekstop:justify-center   ">
                <div className=" bg-gradient-to-r       w-full justify-evenly box-border m-8  items-center text-3xl flex p-2 border border-[#482D2E] border-solid  "><h2 className="text-[#482D2E]  w-11/12 text-center ">Productos</h2>
                    <div className="w-1/12   justify-around">
                        <Link to='/agregar_producto'><img  className="w-1/2" src="Agregar.png"/></Link>
                    </div>
                </div>
                <div className="mx-auto laptop:w-full  grid tablet:grid-cols-2  gap-4  justify-center bg-gradient-to-b from-white to-[#FC9939]">
                    {data && data.map(element =>  <CardProductos src={element.filename} val={bandera} style="cursor-pointer justify-evenly items-center  h-48  border border-solid border-black " fnVal={setBandera} id={element.id} text={ element.nombre} tipo={element.tipo} precio={ element.precio} cantidad={element.cantidad} descripcion={'Acabado ' + element.acabado} ></CardProductos>)}
                </div>
            </div>
        </div>
    )
}

export default SectionProd;