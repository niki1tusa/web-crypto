import { type FormikProps } from "formik"
import styles from "./input.module.scss"
import cn from "classnames"
export const Input = ({
  name,
  label,
  formik,
  maxWidth,
  type = 'text',
}: {
  name: string
  label: string
  formik: FormikProps<any>
  maxWidth?: number | string
  type?: 'text' | 'password' | 'email'
}) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  const inValid = !!touched && !!error
  const disabled = formik.isSubmitting

  return (
    <div className={cn(styles.field, disabled ? styles.disabled : "")}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <br />
      <input
        className={cn(styles.input, inValid ? styles.invalid : "")}
        style={{ maxWidth }}
        onChange={e => {
          void formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          void formik.setFieldTouched(name)
        }}
        type={type}
        name={name}
        id={name}
        value={value}
        disabled={disabled}
      />
      {inValid && <div className={styles.error}>{error}</div>}
    </div>
  )
}
