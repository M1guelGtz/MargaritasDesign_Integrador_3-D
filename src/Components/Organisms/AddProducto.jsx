import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../Atoms/Button";
import FieldLogIn from "../Molecules/FieldLogIn";
function SectionAddClient() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [img, setImg] = useState(null);
  let categoria
  const navigate = useNavigate();

  const handleClickCancel = (e)=>{
    navigate("/productos")
  }
  const handlerClick = async (e) => {
    console.log(document.getElementById("categoria").value)
    categoria = document.getElementById("categoria") .value
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("tipo", categoria );
    formData.append("precio", direccion);
    formData.append("acabado", correo);
    formData.append("image", img);
    formData.append("cantidad", telefono);
    if(direccion<1 || telefono<1 ){
      
      Swal.fire({
        title: 'Error al agregar el producto',
        text: 'El precio y la cantidad deben ser mayor a 0',
        icon: 'error',
      })
    }else{
      if(nombre ==""||direccion==''||correo ==''){
        Swal.fire({
          title: "Todos los campos son obligatorios",
          text: "Complete todos los campos",
          icon: "error",
        })
      }else{
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_BACKEND}/productos`,
          {
            method: "POST",
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
            body: formData,
          }
        );
        if (response.ok) {
          const data = await response.json();
          navigate("/productos");
        } else {
          Swal.fire({
            title: 'Error al agregar el producto',
            text: 'el error consiste en campos no completados',
            icon: 'error',
          })
          console.error("Error creating product:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: 'Error al agregar el producto',
          text: 'Coneccion no establecida',
          icon: 'error',
        })
      }}
    }
  };

  return (
    <div className="text-center items-center flex justify-evenly flex-col w-1/2 rounded-lg p-8 m-1 backdrop-opacity-20  backdrop-invert bg-white/50">
      <form className="flex flex-col w-3/4 justify-center items-center" onSubmit={handlerClick}>
        <h2 className="text-3xl">Agregar Producto</h2>
        <div className="justify-center w-full items-center">
          <FieldLogIn type="text" text="Agregar un nombre al producto"
          style='border-b-2 border-b-black m-5'
            val={nombre}
            fnVal={setNombre}
          ></FieldLogIn>
          <span>Categoria para el producto</span><br />
          <select id='categoria' className='w-60 border-solid border border-black'>
            <option default value="Sala">Sala</option>
            <option value="Comedor">Comedor</option>
            <option value="Dormitorio">Dormitorio</option>
            <option value="Exterior">Exterior</option>
            <option value="Rustico">Rustico</option>
          </select><br/>
          <FieldLogIn
            style='border-b-2 border-b-black m-5'
            type="number"
            text="Precio para el producto"
            val={direccion}
            fnVal={setDireccion}
          ></FieldLogIn>
          <FieldLogIn
            style='border-b-2 border-b-black m-5'
            type="text"
            text="Tipo de acabado "
            val={correo}
            fnVal={setCorreo}
          ></FieldLogIn>
          <FieldLogIn
            style='border-b-2 border-b-black m-5'
            type="number"
            text="Cantidad para agregar"
            val={telefono}
            fnVal={setTelefono}
          ></FieldLogIn>
          <FieldLogIn style='flex-col justify-evenly flex items-center m-5' type="file" text="Cargue una magen:" val={img} fnVal={setImg} />
        </div>
        <div className="flex w-full justify-evenly ">
          <a  onClick={handleClickCancel} className ='bg-white/50 text-black font-semibold  p-3 cursor-pointer rounded text-base border-2 border-transparent border-solid w-1/3 hover:bg-[#573f1bc4] hover:border-2 hover:border-white hover:text-white' >Regresar</a>
          <Button text="Agregar" style='bg-white text-black font-semibold  p-3 cursor-pointer rounded text-base border-2 border-transparent border-solid w-1/3 hover:bg-[#573f1bc4] hover:border-2 hover:border-white hover:text-white' onClick={handlerClick} type="submit"></Button>
        </div>
      </form>
    </div>
  );
}

export default SectionAddClient;
