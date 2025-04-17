import { zCreateIdeaTrpcInput } from "../../../../backend/src/router/createIdea/input"
import { Segment } from "../../components/Segment"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { useFormik } from "formik"
import {withZodSchema} from "formik-validator-zod"
import { trpc } from "../../lib/trpc"
import { useState } from "react"
import { Alert } from "../../components/Alert"
import { Button } from "../../components/Button"
import { FormItems } from "../../components/FormItems"
export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation()
  const [successMessage, setSuccessMessage] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async(value) => {
      try{
      await createIdea.mutateAsync(value)
      formik.resetForm()
      setSuccessMessage(true)

      setTimeout(() => {
        setSuccessMessage(false)
      }, 3000)
      } catch(error: any){
        setSubmitError(error.message)
        setTimeout(() => {
          setSubmitError(null)
        }, 3000);
      }

    },
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={e => {
          e.preventDefault()
          formik.handleSubmit()
        }}
        className="rounded-lg  my-28"
      >
        <FormItems>
        <Input label="Name" name="name" formik={formik} />
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Description" name="description" formik={formik} maxWidth={500}/>
        <Textarea label="Text" name="text" formik={formik} />
        {!formik.isValid && !!formik.submitCount &&<div className="text-red-700">Look on field, some field are invalid!</div>}
        {!!submitError && <Alert color="red">{submitError}</Alert> }
        {successMessage && <Alert color="green">Idea is Created!</Alert>  }
        <Button loading={formik.isSubmitting}> Create a new Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
