
export const Input = ({title, value, setFnc}:{title:string, value:string, setFnc:any}) => {
  return (
    <div className="mb-3 ">
    <label htmlFor={value}>{title}</label>
    <br />
    <input onChange={setFnc}
    type="text" name={value} id={value}/>
  </div>
  )
}
