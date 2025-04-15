import { type FormikProps } from "formik"

export const Input = ({ name, label, formik}:{ name:string, label:string, formik:FormikProps<any>}) => {
  const value = formik.values[name]
  return (
    <div className="mb-3 ">
    <label htmlFor={name}>{label}</label>
    <br />
    <input onChange={(e)=>{
      void formik.setFieldValue(name, e.target.value)
    }}
    type="text" 
    name={name} 
    id={name}
    value={value}/>
  </div>
  )
}
