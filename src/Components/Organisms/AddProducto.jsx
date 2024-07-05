import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Atoms/Button";
import FieldLogIn from "../Molecules/FieldLogIn";
function SectionAddClient () {
    const [nombre, setNombre]=useState('');
    const [apellidos, setApellidos]=useState('');
    const [direccion, setDireccion] = useState('')
    const [correo, setCorreo] = useState('')
    const [telefono, setTelefono] = useState('')
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    const handlerClick = (e) =>{
        navigate("/productos")
            fetch(`${import.meta.env.VITE_URL_BACKEND}/productos`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({
                "nombre": nombre,
                "tipo": apellidos,
                "precio": direccion,
                "acabado": correo,
                "cantidad": telefono
            })
        }).then(
            response => {
                if(response.ok){
                    return response.json()
                }
            }
        ).then(
            data => {
            }
        ).catch(error =>{
            console.log(error)
        })
        console.log(data)
    }
    return (
        <div className="text-center flex justify-evenly  flex-col w-1/2 rounded-lg p-8 m-1 backdrop-opacity-10 backdrop-invert bg-white/30 ">
            <form  className="flex flex-col ">
                <h2 className="text-3xl">Welcome</h2>
                <div>
                    <FieldLogIn type='text' text='Agregar un nombre al producto' val={nombre} fnVal={setNombre}></FieldLogIn>
                    <FieldLogIn type='text' text='Categoria del producto' val={apellidos} fnVal={setApellidos}></FieldLogIn>
                    <FieldLogIn type='number' text='Precio para el producto' val={direccion} fnVal={setDireccion}></FieldLogIn>
                    <FieldLogIn type='text' text='Tipo de acabado ' val={correo} fnVal={setCorreo}></FieldLogIn>
                    <FieldLogIn type='number' text='Cantidad para agregar' val={telefono} fnVal={setTelefono}></FieldLogIn>
                </div>
                <div className="m-4">
                </div>
                <Button text='Guardar' type='button' onClick={handlerClick}></Button>
            </form>
        </div>
    )
}
export default SectionAddClient;