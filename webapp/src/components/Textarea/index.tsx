import { type FormikProps } from "formik"
import styles from './textarea.module.scss'
import cn from 'classnames'

export const Textarea = ({ name, label, formik}:{ name:string, label:string, formik:FormikProps<any>}) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  const inValid = !!touched && !!error 
  const disabled = formik.isSubmitting
  return (
    <div className={cn(styles.field, disabled? styles.disabled: '' )}>
    <label className={styles.label} htmlFor={name}>{label}</label>
    <br />
    <textarea 
    className={cn(styles.input, inValid? styles.invalid: '')}
    onChange={(e)=>{
      void formik.setFieldValue(name, e.target.value)
    }} 
    name={name} 
    id={name}
    value={value}
    disabled={disabled}/>
        {inValid && <div className={styles.error}>{error}</div>}
  </div>
  )
} 