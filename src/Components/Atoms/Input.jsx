function Input (props) {
    const handlerOnChange =(event=>{
        if(props.type == "file"){
            props.fnVal(event.target.files[0])
        }else{

            props.fnVal(event.target.value)
        }
    })
    
    return (
        <input ref={props.ref} onBlur={props.onBlur} className="text-center w-full h-10 bg-transparent border-none outline-none font-semibold" type={props.type} onChange={handlerOnChange}></input>
    )
}

export default Input;