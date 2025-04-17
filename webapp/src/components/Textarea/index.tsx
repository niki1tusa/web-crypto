import { type FormikProps } from "formik"


export const Textarea = ({ name, label, formik}:{ name:string, label:string, formik:FormikProps<any>}) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  return (
    <div className="mb-3 ">
    <label htmlFor={name}>{label}</label>
    <br />
    <textarea onChange={(e)=>{
      void formik.setFieldValue(name, e.target.value)
    }} 
    name={name} 
    id={name}
    value={value}
    disabled={formik.isSubmitting}/>
        {!!touched && !!error && <div className="text-red-700">{error}</div>}
  </div>
  )
} 