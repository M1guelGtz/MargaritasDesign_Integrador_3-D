import { useEffect, useState } from "react";
import SectionGenReporte from "../Molecules/FieldGenReporte";
import FieldRepV from "../Molecules/FieldRepV";
import FieldRepVgastos from "../Molecules/FieldRepVeGastos";
function SectionReporteVentas(props) {
  const [bandera, setBandera] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [mp, setMp] = useState([]);
  const [ventasGastos, setVentasGastos] = useState({});
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/ventas/reporte/ventas/dia`, {
      method: "GET",
      headers: {
        Authorization: `${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((datos) => {
        setVentas(datos);
        setBandera(true);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch(`${import.meta.env.VITE_URL_BACKEND}/ventas/reporte/gastos/mes`, {
      method: "GET",
      headers: {
        Authorization: `${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((datos) => {
        setVentasGastos(datos);
        setBandera(true);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch(`${import.meta.env.VITE_URL_BACKEND}/ventas/reporte/ventas/dia`, {
      method: "GET",
      headers: {
        Authorization: `${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((datos) => {
        setVentas(datos);
        setBandera(true);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch(
      `${import.meta.env.VITE_URL_BACKEND}/ventas/reporte/ventas/mepasado`,
      {
        method: "GET",
        headers: {
          Authorization: `${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((datos) => {
        setMp(datos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bandera]);
  console.log(ventasGastos.detalles);
  return (
    <div className="w-full flex  flex-col items-center m- p-8">
      <div className=" w-full justify-evenly  items-center text-3xl flex  p-2 border border-black border-solid  ">
        <h2 className="  w-11/12 text-center ">Reporte de ventas</h2>
      </div>
      <div className="flex w-full m-5 h-80 justify-evenly items-center">
        <FieldRepV
          data={ventas}
          title="Ventas del dia"
          subt="Ganancias totales del dia"
        ></FieldRepV>
        <FieldRepV
          data={ventasGastos}
          dataMP={mp}
          title="Gastos de este mes"
          subt="Gastos del mes pasado"
        ></FieldRepV>
        <FieldRepVgastos data={ventasGastos.detalles}></FieldRepVgastos>
      </div>
      <div className="flex  w-full h-80 justify-evenly  items-center">
        <SectionGenReporte></SectionGenReporte>
      </div>
    </div>
  );
}
export default SectionReporteVentas;
