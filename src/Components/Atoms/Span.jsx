function Span(props) {
  return (
    <>
      <span className={`text-center ${props.style}`}> {props.span} </span>
    </>
  );
}
export default Span;
