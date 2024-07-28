import Span from "../Atoms/Span";

function Foother() {
  return (
    <div className="w-full bg-[#FFF9E3] flex h-80 ">
      <div className="w-1/2 flex items-center justify-evenly h-full ">
        <img src="icons8-facebook-nuevo-96.png" alt="" />
        <img src="icons8-instagram-96.png" alt="" />
      </div>
      <div className="w-1/2   flex text-xl flex-col items-start justify-around">
        <Span span="Telefono: +52 967 1000000"></Span>
        <Span span="Correo electronico: diseñosMargarita@gmail.com"></Span>
        <Span span="Direccion: Calle de las artes, 123, 28012, San Cristobal de las casas, Chiapas México"></Span>
        <Span span="Horario de atencion: Lunes a viernes de  9:00 - 18:00 hrs mx"></Span>
      </div>
    </div>
  );
}
export default Foother;
