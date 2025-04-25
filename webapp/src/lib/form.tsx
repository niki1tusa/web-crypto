import { FormikHelpers, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useMemo, useState } from "react";
import { z } from "zod";
import { BtnProps } from "../components/Button";
import { AlertProps } from "../components/Alert";

// TZodSchema придуман и получает расширение с помощью extends
// z.infer - получить тип который определяет эту схему

export const useForm = <TZodSchema extends z.ZodTypeAny>({
    successMessage = false,
    resetOnSuccess = true,
    showValidationAlert = false,
    initialValues = {},
    validationSchema,
    onSubmit,
}: {
    successMessage?: string | false
    resetOnSuccess?: boolean
    showValidationAlert?: boolean
    initialValues?: z.infer<TZodSchema>
    validationSchema?: TZodSchema
    onSubmit?: (values: z.infer<TZodSchema>, actions: FormikHelpers<z.infer<TZodSchema>>) => Promise<any> | any
}) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<Error | null>(null)

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues,
    ...(validationSchema && { validate: withZodSchema(validationSchema) }),
    onSubmit: async (values, formikHelpers) => {
      if(!onSubmit){
        return
      }
      try {
        setSubmittingError(null)
        await onSubmit(values, formikHelpers)
        if (resetOnSuccess) {
          formik.resetForm()
        }
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (error: any) {
        setSubmittingError(error)
      }
    },
  })

  const alertProps = useMemo<AlertProps>(() => {
    if (submittingError) {
      return {
        hidden: false,
        children: submittingError.message,
        color: 'red',
      }
    }
    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return {
        hidden: false,
        children: 'Some fields are invalid',
        color: 'red',
      }
    }
    if (successMessageVisible && successMessage) {
      return {
        hidden: false,
        children: successMessage,
        color: 'green',
      }
    }
    return {
      color: 'red',
      hidden: true,
      children: null,
    }
  }, [submittingError, formik.isValid, formik.submitCount, successMessageVisible, successMessage, showValidationAlert])

  const btnProps = useMemo<Omit<BtnProps, 'children'>>(() => {
    return {
      loading: formik.isSubmitting,
    }
  }, [formik.isSubmitting])

  return {
    formik,
    alertProps,
    btnProps,
  }
}