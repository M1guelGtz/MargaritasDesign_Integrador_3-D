import { Helmet } from "react-helmet-async";
import SectionLogin from "../Components/Organisms/SectionLogin";
function Login () {
    return (
        <>
        <Helmet>
            <title>Margarita´s Design | Login</title>
        </Helmet>
        <div className="flex justify-center w-full h-screen">
            <SectionLogin></SectionLogin>
        </div>
        </>
    )
}
export default Login;