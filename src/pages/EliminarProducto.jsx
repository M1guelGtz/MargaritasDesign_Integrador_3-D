import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Atoms/Button.jsx";
import FieldLogIn from "../Components/Molecules/FieldLogIn";
function EliminarProd (){
    const [id, setId] = useState("")
    const navigate = useNavigate();
    const handlerClick = (e) =>{
        fetch(`${import.meta.env.VITE_URL_BACKEND}/productos/${id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({
                "id": id,
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
        navigate  ("/productos")
    }
    return (
        <div>
            <FieldLogIn val={id} fnVal={setId} text="ingrese el id del elemento a eliminar" type="number"></FieldLogIn>
            <Button text='Eliminar' onClick={handlerClick}></Button>
        </div>
    )
}
export default EliminarProd;