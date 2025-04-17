import { zCreateIdeaTrpcInput } from "../../../../backend/src/router/createIdea/input"
import { Segment } from "../../components/Segment"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { useFormik } from "formik"
import {withZodSchema} from "formik-validator-zod"
import { trpc } from "../../lib/trpc"
import { useState } from "react"
export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation()
  const [successMessage, setSuccessMessage] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async(value) => {
      await createIdea.mutateAsync(value)
      formik.resetForm()
      setSuccessMessage(true)

      setTimeout(() => {
        setSuccessMessage(false)
      }, 3000);
    },
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={e => {
          e.preventDefault()
          formik.handleSubmit()
        }}
        className="rounded-lg bg-white"
      >
        <Input label="Name" name="name" formik={formik} />
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Description" name="description" formik={formik} />
        <Textarea label="Text" name="text" formik={formik} />
        {!formik.isValid && !!formik.submitCount &&<div className="text-red-700">Look on field, some field are invalid!</div>}
      {successMessage?<div className="text-green-500">Idea is Created</div> : }
        <button disabled={formik.isSubmitting} type="submit">
         {formik.isSubmitting? 'submiting' : 'create idea'}
          </button>
      </form>
    </Segment>
  )
}
