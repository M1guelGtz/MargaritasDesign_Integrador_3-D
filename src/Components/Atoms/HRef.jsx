import { useNavigate } from "react-router-dom";

function Href (props) {
    const navigate = useNavigate();
    const handlerClick = (e) =>{
        navigate(`${props.ruta}`)
    }
    return(
        <button  onClick={handlerClick} className="hover:bg-white hover:border-solid hover:border-black hover:border-2 w-36 flex flex-col justify-center items-center rounded-xl ">
            <img src={props.imagen} alt="" className="w-16"/>
            <span>{props.text}</span>
            <a href=""></a>
        </button>
    )
}
export default Href;