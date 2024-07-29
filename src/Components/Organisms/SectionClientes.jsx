import { useEffect, useState } from "react";
import CardClientes from "../Molecules/CardClientes";
function SectionClientes(props) {
  const [data, setData] = useState([]);
  const [bandera, setBandera] = useState(false);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/usuarios`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((datos) => {
        setData(datos)
        setBandera(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bandera]);
  return (
    <div>
      <div className="flex flex-wrap w-full justify-center">
        <div className="w-full  justify-evenly m-8 items-center text-3xl flex p-2 border border-black border-solid  ">
          <h2 className=" bg-tefi w-11/12 text-center ">{props.text}</h2>
        </div>
        <div className="flex w-full bg-gradient-to-b from-white via-white to-[#ffb84d] flex-wrap justify-center">
          {data.map((element) => (
            <CardClientes
              val={bandera}
              fnVal={setBandera}
              id={element.id}
              correo={element.correo_electronico}
              text={element.nombre + " " + element.apellido_paterno}
              telefono={element.telefono}
              direccion={element.direccion}
            ></CardClientes>
          ))}
        </div>
      </div>
    </div>
  );
}
export default SectionClientes;
