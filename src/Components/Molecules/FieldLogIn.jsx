import Input from "../Atoms/Input";
import Label from "../Atoms/Label";

function FieldLogIn (props){
    return (
        <div className="m-5 relative border-b-2 w-full rounded-t-2xl bg-[#69545481] border-black border-solid">
            <Label text = {props.text}></Label>
            <Input ref={props.ref} text={props.text} type={props.type} val={props.val} fnVal={props.fnVal}></Input>
        </div>
    )
}
export default FieldLogIn;