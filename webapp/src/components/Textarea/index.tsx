export const Textarea= ({title, value, setFnc}:{title:string, value:string, setFnc:any}) => {
    return (
      <div className="mb-3 ">
      <label htmlFor={value}>{title}</label>
      <br />
      <textarea onChange={setFnc}
       name={value} id={value}/>
    </div>
    )
  }