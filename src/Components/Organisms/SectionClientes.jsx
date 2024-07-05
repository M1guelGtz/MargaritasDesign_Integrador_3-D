import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardClientes from "../Molecules/CardClientes";
function SectionClientes (props) {
    const [data, setData] = useState([]);
    const [bandera, setBandera] = useState(false)
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_URL_BACKEND}/usuarios`).then (response => {
            if(response.ok)
                return response.json()
            }).then (datos => {
                setData(datos)
                console.log(data)
                setBandera(true)
            }).catch(
                error=>{
                    console.log(error)
                }
            )
        },
        [bandera]
    );
    return(
        <div>
            <div className="flex flex-wrap w-full justify-center">
                <h2 className="w-full justify-center m-8 items-center text-3xl flex p-2 border border-black border-solid">{props.text}</h2>
                <div className="flex flex-wrap w-5/6 justify-center">
                    {data.map(element => <CardClientes correo={element.correo_electronico} text={element.nombre + ' ' + element.apellidos} telefono={element.telefono} direccion={element.direccion}></CardClientes>)}
                </div>
                <div className="w-1/12 justify-around">
                <Link to='/agregar_clientes'><img className="w-1/2" src="Agregar.png" alt="" /></Link>
                    
                </div>
            </div>
        </div>
    )
}
export default SectionClientes;