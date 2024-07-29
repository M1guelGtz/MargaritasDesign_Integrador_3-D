import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FieldTablaPedidos from "../Molecules/FieldTablaPedidos";
import TablaElements from "../Molecules/TablaElements";
function SectionPedidos(props) {
  let nombre, direccion, telefono, correo, descripcion;
  let select, selectE;
  const [data, setData] = useState([]);
  const [bandera, setBandera] = useState(true);
  const [val, setVal] = useState("");
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/pedidos`, {
      method: "GET",
      headers: {
        "Authorization": `${sessionStorage.getItem("token")}`,
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
      //--------------- * Pantalla modal para editar el pedido * -----------
      title: `Registro de Pedidos`,
      background: "#FDEBD0",
      showCloseButton: "close",
      width: "30%",
      html: `
                <form class="form-group">
                        <label for="swal-input6">Producto:
                            <input type='text' required id="swal-input6" class="swal2-input">
                        </label><br/>
                        <label for="swal-input7">Ingresos :
                            <input type='number' required id="swal-input7" class="swal2-input">
                        </label><br/>
                        <label for="swal-input8">Id del cliente:
                            <input type='number'   required id="swal-input8" class="swal2-input">
                        </label><br/>
                        <span>Estatus del pago:</span>
                        <select id='pago-s' className='w-60 border-solid border border-black'>
                            <option value="0">Incompleto</option>
                            <option value="1">Completado</option>
                        </select><br/>
                        <span>Estatus del envio:</span>
                        <select id='envio'>
                            <option value="0">Incompleto</option>
                            <option value="1">Completado</option>
                        </select>
                </form>
                        `,
      showCancelButton: true,
      cancelButtonText: "<img src='icons8-cancelar-48.png'/>",
      cancelButtonColor: "transparent",
      confirmButtonText: "<img src='icons8-aceptar-48.png'/>",
      confirmButtonColor: "transparent",
      focusConfirm: false,
      preConfirm: () => {
        nombre = document.getElementById("swal-input6").value;
        telefono = Number(document.getElementById("swal-input7").value);
        direccion = document.getElementById("swal-input8").value;
        select = document.getElementById("pago-s");
        select.addEventListener("change", () => {
          var selectedOption = this.options[select.selectedIndex];
          console.log(selectedOption.value + ": " + selectedOption.text);
        });
        selectE = document.getElementById("envio");
        selectE.addEventListener("change", () => {
          var selectedOption = this.options[select.selectedIndex];
          console.log(selectedOption.value + ": " + selectedOption.text);
        });
      },
    });
    if (formValues) {
      Swal.fire({
        background: "#FDEBD0",
        title: "!Guardado¡",
        icon: "success",
        width: "30%",
      });
      console.log(select.value);
      fetch(`${import.meta.env.VITE_URL_BACKEND}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${sessionStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id_detalles: 1,
          estatus_envio: select.value,
          estatus_pago: selectE.value,
          total: telefono,
          id_admin: 3,
          id_cliente: direccion,
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
        <h2 className="  w-11/12 text-center ">Pedidos</h2>
        <div className="w-1/12   justify-around">
          <div onClick={handlerClick}>
            <img className="w-1/2" src="Agregar.png" alt="" />
          </div>
        </div>
      </div>
      <div className="w-11/12 mt-8">
        <div className="py-2 ">
          <TablaElements
            uno="Fecha"
            dos="Cliente"
            tres="Estatus del Envio"
            cuatro="Ingresos"
            cinco="Estatus del pago"
          ></TablaElements>
        </div>
        <div className="overflow-hidden overflow-y-scroll h-56 border-solid border-black">
          <div>
            {data.map((element) => (
              <FieldTablaPedidos
                style="cursor-pointer w-full flex justify-evenly bg-gray-300"
                val={bandera}
                fnVal={setBandera}
                total={element.total}
                id={element.id}
                fecha={element.fecha}
                estatus_pago={
                  element.estatus_pago == 0 ? "Pendiente" : "completado"
                }
                id_cliente={element.id_cliente}
                estatus_envio={
                  element.estatus_envio == 0 ? "Pendiente" : "Completado"
                }
                detalles={element.detalles}
              ></FieldTablaPedidos>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SectionPedidos;
