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
  console.log(dataMateriaP);
  return (
    <div className="flex w-full  h-2/3 flex-wrap justify-evenly">
      <h2 className="w-full justify-center m-8 items-center text-3xl flex p-2 border bg-gradient-to-r from-blue-400 via-blue-100 to-blue-300 border-black border-solid">
        Notificaciones
      </h2>
      <Details title="Materia prima" data={notificaciones}></Details>
      <Details title="Stock"></Details>
      <Details title="Ventas del dia"></Details>
      <Details title="Pagos del dia"></Details>
      <Details title="Pedidos"></Details>
    </div>
  );
}
export default FieldHome;
