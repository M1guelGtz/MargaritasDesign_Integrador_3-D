import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FieldTablaVentas from "../Molecules/FieldTablaVentas";
import TablaElementsVentas from "../Molecules/TablaElementsVentas";
function SectionVentas(props) {
  let nombre, telefono, direccion, correo, descripcion;
  const [data, setData] = useState([]);
  const [bandera, setBandera] = useState(true);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/ventas`, {
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
        setData(datos);
        setBandera(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bandera]);
  async function handlerClick() {
    const { value: formValues } = await Swal.fire({
      title: ` Registro de ventas`,
      background: "#FDEBD0",
      showCloseButton: "close",
      html: `
                <div class="form-group">
                        <label for="swal-input6">Id del cliente:
                            <input type='number' required id="swal-input6" class="swal2-input">
                        </label><br/>
                        <label for="swal-input7">Ingresos:
                            <input type='number' required id="swal-input7" class="swal2-input">
                        </label><br/>
                        <label for="swal-input8">Producto:
                            <input type='text'   required id="swal-input8" class="swal2-input">
                        </label><br/>
                        `,
      showCancelButton: true,
      cancelButtonText: "<img src='icons8-cancelar-48.png'/>",
      cancelButtonColor: "transparent",
      confirmButtonText: "<img src='icons8-aceptar-48.png'/>",
      confirmButtonColor: "transparent",
      focusConfirm: false,
      preConfirm: () => {
        nombre = Number(document.getElementById("swal-input6").value);
        telefono = Number(document.getElementById("swal-input7").value);
        direccion = document.getElementById("swal-input8").value;
      },
    });
    if (formValues) {
      Swal.fire({
        background: "#FDEBD0",
        title: "!Guardado¡",
        icon: "success",
        width: "30%",
      });
      fetch(`${import.meta.env.VITE_URL_BACKEND}/ventas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${sessionStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          detalles: direccion,
          ingresos: telefono,
          id_cliente: nombre,
          id_admin: 3,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          setBandera(!bandera);
        })
        .catch((error) => {
          console.error("Error al intentar guardar los cambios:", error);
        });
    }
    setBandera(!bandera);
  }
  return (
    <div className="w-full flex  flex-col items-center m- p-8">
      <div className=" w-full justify-evenly items-center text-3xl flex p-2 border border-black border-solid  ">
        <h2 className="  w-11/12 text-center ">Registro de ventas</h2>
        <div className="w-1/12   justify-around">
          <div onClick={handlerClick}>
            <img className="w-1/2" src="Agregar.png" alt="" />
          </div>
        </div>
      </div>
      <div className="w-11/12 mt-8">
        <div className="py-2 ">
          <TablaElementsVentas
            uno="Id"
            dos="Fecha"
            tres="Cliente"
            cuatro="Ingresos"
          ></TablaElementsVentas>
        </div>
        <div className="overflow-hidden overflow-y-scroll h-56 border-solid border-black">
          <div>
            {data != null
              ? data.map((element) => (
                  <FieldTablaVentas
                    style="cursor-pointer w-full flex justify-evenly bg-gray-300"
                    val={bandera}
                    fnVal={setBandera}
                    precio={element.ingresos}
                    id={element.id}
                    cantidad={element.id_cliente}
                    nombre={element.fecha}
                    descripcion={element.detalles}
                  ></FieldTablaVentas>
                ))
              : "Sin datos por cargar"}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SectionVentas;
