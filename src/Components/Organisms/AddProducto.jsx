import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Atoms/Button";
import FieldLogIn from "../Molecules/FieldLogIn";

function SectionAddClient() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  const handlerClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("tipo", apellidos);
    formData.append("precio", direccion);
    formData.append("acabado", correo);
    formData.append("image", img);
    formData.append("cantidad", telefono);

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
        console.log(data);
        navigate("/productos");
      } else {
        console.error("Error creating product:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="text-center flex justify-evenly flex-col w-1/2 rounded-lg p-8 m-1 backdrop-opacity-10 backdrop-invert bg-white/30">
      <form className="flex flex-col" onSubmit={handlerClick}>
        <h2 className="text-3xl">Welcome</h2>
        <div>
          <FieldLogIn
            type="text"
            text="Agregar un nombre al producto"
            val={nombre}
            fnVal={setNombre}
          ></FieldLogIn>
          <FieldLogIn
            type="text"
            text="Categoria del producto"
            val={apellidos}
            fnVal={setApellidos}
          ></FieldLogIn>
          <FieldLogIn
            type="number"
            text="Precio para el producto"
            val={direccion}
            fnVal={setDireccion}
          ></FieldLogIn>
          <FieldLogIn
            type="text"
            text="Tipo de acabado "
            val={correo}
            fnVal={setCorreo}
          ></FieldLogIn>
          <FieldLogIn
            type="number"
            text="Cantidad para agregar"
            val={telefono}
            fnVal={setTelefono}
          ></FieldLogIn>
          <FieldLogIn type="file" text="Imagen" val={img} fnVal={setImg} />
        </div>
        <div className="m-4"></div>
        <Button text="Guardar" onClick={handlerClick} type="submit"></Button>
      </form>
    </div>
  );
}

export default SectionAddClient;
