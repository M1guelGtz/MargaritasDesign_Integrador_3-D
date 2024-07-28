import { useEffect, useState } from "react";
import CardProductosC from "../Molecules/CardProdC";

function SectionMarg(props){
    const [data, setData] = useState([]);
    const [bandera, setBandera] = useState(false);
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_URL_BACKEND}/productos`).then (response => {
            if(response.ok)
                return response.json()
            }).then (datos => {
                setData(datos)
                setBandera(true)
            }).catch(
                error=>{
                    console.log(error)
                }
            )
        },[bandera]
    );
    return(
        <>
            <div className="bg-yellow-200 flex-col w-full h-20 flex items-center justify-evenly">
                <h2 className="w-full text-center text-5xl ">Nuestros Productos</h2>
            </div>
            <div className="mt-10 mx-auto laptop:w-full  grid tablet:grid-cols-2  gap-4  justify-center m-10">
                {
                    data.length == null ? 'No hay Productos cargados' :  data.map(element =>  <CardProductosC src={element.filename} val={bandera} id_car={props.id} style="cursor-pointer justify-evenly items-center  h-48  border border-solid border-black " fnVal={setBandera} id={element.id} text={ element.nombre} tipo={element.tipo} precio={ element.precio} cantidad={element.cantidad} descripcion={'Acabado ' + element.acabado} ></CardProductosC>)  
                }
            </div>
            
        </>
    )
}
export default SectionMarg;