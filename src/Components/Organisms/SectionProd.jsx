import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardProductos from "../Molecules/CardProductos";
function SectionProd(props){
    const [data, setData] = useState([]);
    const [bandera, setBandera] = useState(false)
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
    return (
        <div>
            <div className="flex flex-wrap w-full justify-center    ">
                <h2 className="w-full justify-center m-8 items-center text-3xl flex p-2 border border-black border-solid">Productos</h2>
                <div className="flex flex-wrap w-5/6 justify-center">
                    {
                        data.map(element =>  <CardProductos val={bandera} fnVal={setBandera} id={element.id} text={ element.nombre} tipo={element.tipo} precio={'precio: $' + element.precio} descripcion={'En existencia: ' + element.cantidad + ', con cabado ' + element.acabado} ></CardProductos>)
                    }
                </div>
                <div className="w-1/12 justify-around">
                <Link to='/agregar_producto'>
                    <img  className="w-1/2" src="icons8-añadir-48.png" alt="" />
                </Link>
                
                </div>
            </div>
        </div>
    )
}
export default SectionProd;