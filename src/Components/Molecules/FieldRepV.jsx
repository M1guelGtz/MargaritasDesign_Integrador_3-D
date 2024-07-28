import Span from "../Atoms/Span"
import Title from "../Atoms/Title"

function FieldRepV(props){
    console.log(props.data)
    return(
        <div className=" border-solid flex flex-col justify-between m-5 rounded-t-2xl h-80 bg-[#FFF5C3]   border w-1/4">
            <Title style='border-2 border-solid border-black rounded-t-2xl bg-[#FFF2F2]' text={props.title}></Title>
            <div className="h-1/2">
                <div className="overflow-hidden overflow-y-scroll h-full flex justify-evenly items-center">
                    <Span span={`${props.data != 0 && props.data != null ? `${props.data.ventas!=undefined ? `${props.data.ventas}`: `$${props.data.total}` }`: `${props.subt}` }`}></Span>
                </div>
            </div>
                <Title style='border-2 border-solid border-black bg-[#FFF2F2]' text={props.subt}></Title>
            <div className="h-1/2 ">
                <div className=" overflow-hidden overflow-y-scroll h-full flex justify-evenly items-center">
                    {
                        props.dataMP!=null ? <Span span={`${ props.dataMP != null ? `$${props.dataMP.ventas }`: `${props.subt}` }`}></Span> : <Span span={`$${ props.data != null ? `${props.data.ventas }`: `${props.subt}` }`}></Span>
                    }
                    
                </div>
            </div>
        </div>
    )
}
export default FieldRepV