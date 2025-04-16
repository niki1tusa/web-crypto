import { Segment } from "../../components/Segment"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { useFormik } from "formik"
import {withZodSchema} from "formik-validator-zod"
import {z} from "zod"
export const NewIdeaPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(1),
        nick: z.string().min(1).regex(/^[a-z0-9-]+$/, "Nick may contain only lowercase letters, numbers and dashes"),
        description: z.string().min(1),
        text: z.string().min(100)
      })
    ),
    onSubmit: e => {
      console.info("subbik", e)
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
        <button type="submit">create idea</button>
      </form>
    </Segment>
  )
}
