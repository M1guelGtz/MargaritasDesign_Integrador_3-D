import { useEffect, useState } from "react";
import Details from "../Molecules/FieldHome";
function FieldHome() {
  const [dataMateriaP, setDataM] = useState([]);
  const [banderaH, setBanderaH] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/ventas/home/notificaciones`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${sessionStorage.getItem("token")}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((datos) => {
        setDataM(datos);
        setBanderaH(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [banderaH]);
  console.log(dataMateriaP)
  return (
    <div className="flex w-full  h-2/3 flex-wrap justify-evenly">
      <h2 className="w-full justify-center m-8 items-center text-3xl flex p-2 border  border-black border-solid">
        Notificaciones
      </h2>
      <Details title="Materia prima" data={dataMateriaP.materia_prima}></Details>
      <Details title="Stock" data={dataMateriaP.productos}></Details>
      <Details title="Ventas del dia" data={dataMateriaP.ventas}></Details>
      <Details title="Pedidos"data={dataMateriaP.pedidos}></Details>
    </div>
  );
}
export default FieldHome;
