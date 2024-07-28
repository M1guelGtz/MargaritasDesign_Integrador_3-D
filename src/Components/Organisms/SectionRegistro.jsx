import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../Atoms/Button";
import FieldLogIn from "../Molecules/FieldLogIn";
export default function SectionRegistro() {
  const navigate = useNavigate();
  const [username, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [apellido_paterno, setApeP] = useState("");
  const [apellido_materno, setApeM] = useState("");
  const [correo_electronico, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  // Función para mostrar alerta de error
  const mostrarError = (mensaje) => {
    Swal.fire({
      title: "Error",
      text: mensaje,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const validarDatos = () => {
    if (!username.trim()) {
      mostrarError("El nombre de usuario es obligatorio.");
      return false;
    }
    if (!apellido_paterno.trim()) {
      mostrarError("El apellido paterno es obligatorio.");
      return false;
    }
    if (!apellido_materno.trim()) {
      mostrarError("El apellido materno es obligatorio.");
      return false;
    }
    if (!password.trim()) {
      mostrarError("La contraseña es obligatoria.");
      return false;
    }
    if (!correo_electronico.trim() || !validateEmail(correo_electronico)) {
      mostrarError("Ingrese un correo electrónico válido.");
      return false;
    }
    if (!telefono.trim() || telefono <= 0) {
      mostrarError("Ingrese un número telefónico válido.");
      return false;
    }
    if (direccion == "") {
      mostrarError("Ingrese una dirección válida.");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handlerClick = () => {
    if (validarDatos()) {
      fetch(`${import.meta.env.VITE_URL_BACKEND}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${sessionStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: username,
          apellido_paterno: apellido_paterno,
          apellido_materno: apellido_materno,
          password: password,
          telefono: telefono.toString(),
          correo_electronico: correo_electronico,
          direccion: direccion,
          rol: 1,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
      Swal.fire({
        title: "Éxito",
        text: "Registro completado.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/login");
    }
  };

  return (
    <div className=" text-center flex justify-evenly flex-col w-full rounded-xl h-full border-black border-solid  m-5 border-2  backdrop-opacity-20 backdrop-invert bg-white/10">
      <h1 className="text-3xl ">
        Bienvenido a <br /> "Diseños Margarita"{" "}
      </h1>
      <br />
      <span className="text-xl">Porfavor complete su registro</span>
      <form className="w-full items-center flex flex-col h-5/6">
        <div className="w-full flex h-4/6 flex-col items-center justify-evenly">
          <div className="w-full flex justify-evenly h-full items-center flex-row">
            <FieldLogIn
              type="text"
              text="Ingrese su nombre de usuario: "
              style="w-1/4 rounded-2xl bg-[#f5deb38c] "
              styleI="text-lg border-b border-black"
              val={username}
              fnVal={setNombre}
            />
            <FieldLogIn
              type="text"
              text="Ingrese su apellido paterno: "
              style="w-1/4 rounded-2xl bg-[#f5deb38c] "
              styleI="border-b text-lg border-black"
              val={apellido_paterno}
              fnVal={setApeP}
            />
            <FieldLogIn
              type="text"
              text="Ingrese su apellido materno: "
              style="w-1/4 rounded-2xl bg-[#f5deb38c] "
              styleI="border-b text-lg border-black"
              val={apellido_materno}
              fnVal={setApeM}
            />
          </div>
          <div className="w-full flex justify-evenly items-center h-full flex-row">
            <FieldLogIn
              type="password"
              text="Ingrese una contraseña"
              style="w-1/4 rounded-2xl bg-[#f5deb38c] "
              styleI="border-b border-black text-lg"
              val={password}
              fnVal={setPassword}
            />
            <FieldLogIn
              type="email"
              text="Ingrese su correo electrónico:"
              style="w-1/4  rounded-2xl bg-[#f5deb38c]"
              styleI="border-b border-black text-lg"
              val={correo_electronico}
              fnVal={setCorreo}
            />
            <FieldLogIn
              type="number"
              text="Ingrese su número telefónico: "
              style="w-1/4  rounded-2xl bg-[#f5deb38c]"
              styleI="border-b border-black text-lg"
              val={telefono}
              fnVal={setTelefono}
            />
          </div>
          <FieldLogIn
            type="text"
            text="Ingrese su direccion: "
            style="w-3/4   rounded-2xl bg-[#f5deb38c] "
            styleI="border-b border-black text-lg"
            val={direccion}
            fnVal={setDireccion}
          ></FieldLogIn>
        </div>
        <div className="flex justify-center p-2 w-full h-2/6 text-center">
          <Button
            style="bg-[#d4a54eee] m-10 text-black font-semibold p-3  cursor-pointer rounded text-base border-2 border-transparent border-solid w-1/2 hover:bg-[#7c5a288b] hover:border-2 hover:border-white hover:text-white"
            text="Registrarse"
            type="button"
            onClick={handlerClick}
          />
        </div>
      </form>
    </div>
  );
}
