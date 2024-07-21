import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../Atoms/Button";
import FieldLogIn from "../Molecules/FieldLogIn";
function SectionLogin () {
    const [usuario, setUsuario]=useState('');
    const [password, setpassword]=useState('');
    const navigate = useNavigate();
    const handlerClick = (e)=>{
        fetch(`${import.meta.env.VITE_URL_BACKEND}/auth/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                username: usuario,
                password: password,
            })
        }).then (response => {
            if(response.ok)
                return response.headers
        }).then (datos => {
            const token = datos.get("Authorization")
            console.log(token)
            sessionStorage.setItem("token",token)
            navigate("/home")
            console.log(datos.get('Authorization'))
        }).catch(
            error=>{
                console.log(error)
                Swal.fire({
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
        )
    }




    
    return (
        <div className="text-center flex justify-evenly m-20 flex-col w-96 rounded-lg p-8 border-2 border-black border-solid backdrop-opacity-20 backdrop-invert bg-white/30 ">
            <form  className="flex flex-col ">
                <h2 className="text-3xl mb-5">Welcome</h2>
                <div className="flex items-center justify-center w-80">
                    <img className="w-24 rounded-full" src="/Logo.jpg" alt="aqui va el logo" />
                </div>
                <div className=" flex flex-col items-center justify-between h-1/2" >
                    <FieldLogIn type='text' text='Enter your username: '  val={usuario} fnVal={setUsuario}></FieldLogIn>
                    <FieldLogIn type='password' text='Enter your password:'  val={password} fnVal={setpassword}></FieldLogIn>
                </div>
                <div className="flex justify-center  p-2  w-full text-center">
                    <Button style="bg-white text-black font-semibold  p-3 cursor-pointer rounded text-base border-2 border-transparent border-solid w-1/2 hover:bg-[#573f1bc4] hover:border-2 hover:border-white hover:text-white" text='Log In' type='button' onClick={handlerClick}></Button>
                </div>
                
            </form>
        </div>
    )
}
export default SectionLogin;