import Img from "../Atoms/Img";
import Span from "../Atoms/Span";
import Title from "../Atoms/Title";
function CardClientes (props) {
    return (
        <div className="flex  justify-evenly items-center w-5/12 m-5 bg-blue-50 rounded-2xl border-solid border   border-black">
            <div className="w-1/3 justify-evenly  items-center flex flex-col">
                <Img img = 'Cliente.png'></Img>
                <Span span={props.text}></Span>
            </div>
            <div className= "border-solid border-l bg-blue-100 border-black rounded-e-2xl w-2/3 h-full flex flex-col items-center justify-around">
                <Title text={props.text}></Title>
                <Span span={props.correo}></Span>
                <Span span={props.telefono}></Span>
                <Span span={props.direccion}></Span>
            </div>
        </div>
    )
}
export default CardClientes;