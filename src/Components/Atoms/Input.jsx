function Input (props) {
    const handlerOnChange =(event=>{
        props.fnVal(event.target.value)
    })
    return (
        <input ref={props.ref} className="w-full h-10 bg-transparent border-none outline-none font-semibold" type={props.type} onChange={handlerOnChange}></input>
    )
}

export default Input;