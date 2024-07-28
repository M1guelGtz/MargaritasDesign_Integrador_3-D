import { Helmet } from "react-helmet-async"
import SectionRegistro from "../Components/Organisms/SectionRegistro"
function Registro ( props) {
    return (
        <>
        <Helmet>
            <title>Margarita´s Design | Registro</title>
        </Helmet>
        <div className="flex justify-center w-full h-screen p-10  bg-flor bg-no-repeat bg-center bg-fixed bg-cover bg-blend-screen ">
            <SectionRegistro/>
        </div>
        </>
    )
}
export default Registro