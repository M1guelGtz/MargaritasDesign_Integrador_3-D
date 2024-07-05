import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Atoms/Button";

import FieldLogIn from "../Molecules/FieldLogIn";
function SectionLogin () {
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const [usuario, setUsuario]=useState('');
    const [password, setpassword]=useState('');
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    /*fetch(`${import.meta.env.VITE_URL_BACKEND}/usuarios`).then (response => {
        if(response.ok)
            return response.json()
    }).then (datos => {
        setData(datos)
    }).catch(
        error=>{
            console.log(error)
        }
    )*/
    const handlerClick2=()=>{

    }
    const handlerClick = (e)=>{
        fetch(`${import.meta.env.VITE_URL_BACKEND}/auth/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            })
        }).then (response => {
            if(response.ok)
                return response.json()
        }).then (datos => {
            localStorage.setItem('token', datos.token)
            //setData(datos)
            navigate("/home")
            console.log(datos)
        }).catch(
            error=>{
                console.log(error)
            }
        )
        /*console.log(data)
        for (let index = 0; index < data.length; index++) {
            if(data[index].nombre == usuario && data[index].contraseña == password){
                navigate("/home") 
                return
            }else{
                const { value: text } = await Swal.fire({
                    title: "Datos incorrectos....",
                    text: "¿No tiene cuenta? cree una en el boton de ¡Registro!",
                    icon:"error",
                    background:'linear-gradient(#68B11b4, #0F4FAF)',
                    showCancelButton: true,
                    cancelButtonText: "cerrar",
                    cancelButtonColor:"red", 
                    confirmButtonText: "¡Registro!",
                    confirmButtonColor:"green",
                });
                if (text) {
                    navigate("/registrer")
                }
                return
                /*Swal.fire({
                    title: "Datos incorrectos....",
                    text: "¿No tiene cuenta? cree una en el boton de ¡Registro!",
                    icon:"error",
                    background:'linear-gradient(#68B11b4, #0F4FAF)',
                    showCancelButton: true,
                    cancelButtonText: "cerrar",
                    cancelButtonColor:"red", 
                    confirmButtonText: "¡Registro!",
                    confirmButtonColor:"green",
                })
            }
        }*/
        
    }
    return (
        <div className="text-center flex justify-evenly m-20 flex-col w-96 rounded-lg p-8 border-2 border-black border-solid backdrop-opacity-10 backdrop-invert bg-white/30 ">
            <form  className="flex flex-col ">
                <h2 className="text-3xl mb-5">Welcome</h2>
                <div className="flex items-center justify-center w-80">
                    <img className="w-24 rounded-full" src="/Logo.jpg" alt="aqui va el logo" />
                </div>
                <div>
                    <FieldLogIn type='text' text='Enter your username: ' ref={usernameRef} val={usuario} fnVal={setUsuario}></FieldLogIn>
                    <FieldLogIn type='password' text='Enter your password:' ref={passwordRef} val={password} fnVal={setpassword}></FieldLogIn>
                </div>
                <div className="m-4">
                </div>
                <Button text='Log In' type='button' onClick={handlerClick}></Button>
                <Button text='guardar' type='button' onClick={handlerClick2}></Button>
                
            </form>
        </div>
    )
}
export default SectionLogin;