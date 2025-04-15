
import { Segment } from "../../components/Segment"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { useFormik } from "formik"


export const NewIdeaPage = () => {
  const formik = useFormik({
    initialValues: {
    name: '',
    nick: '',
    description: '',
    text: '',
    },
    onSubmit: (e)=>{
      console.info('subbik', e)
    }
  })
  return (
 <Segment title="New Idea">
  <form onSubmit={e=>{
    e.preventDefault()
    formik.handleSubmit()
  }} className="rounded-lg bg-white/50">
    <Input label="Name" name="name" formik={formik}/>
    <Input label="Nick" name="nick" formik={formik}/>
    <Input label="Description" name="description" formik={formik}/>
    <Textarea label="Text" name="text" formik={formik}/>
    <button type="submit">create idea</button>
  </form>
 </Segment>
  )
}
