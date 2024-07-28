import Input from "../Atoms/Input";
import Label from "../Atoms/Label";

function FieldLogIn (props){
    return (
        <div className={`${props.style} `}>
            <Label text = {props.text} style={props.styleI}></Label>
            <Input ref={props.ref} text={props.text} type={props.type} val={props.val} fnVal={props.fnVal}></Input>
        </div>
    )
}
export default FieldLogIn;