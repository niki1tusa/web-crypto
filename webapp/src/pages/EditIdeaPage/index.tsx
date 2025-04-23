import { useNavigate, useParams } from "react-router"
import { EditIdeaTypeParams, getViewIdeaRoute } from "../../lib/routes"
import { trpc } from "../../lib/trpc"
import type {TrpcRouteOutput} from '../../.././../backend/src/router/index.ts'
import { useFormik } from "formik"
import { withZodSchema } from "formik-validator-zod"
import { useState } from "react"
import { Alert } from "../../components/Alert/index.tsx"
import { Button } from "../../components/Button/index.tsx"
import { FormItems } from "../../components/FormItems/index.tsx"
import { Input } from "../../components/Input/index.tsx"
import { Segment } from "../../components/Segment/index.tsx"
import { Textarea } from "../../components/Textarea/index.tsx"
import { zUpdateIdeaTrpcInput } from "../../../../backend/src/router/updateIdea/input.ts"
import { pick } from "lodash"

// omit это обратная функция от extend от ZOD (omit выкидывает свойство)
const EditIdeaComponent = ({idea}: {idea: NonNullable<TrpcRouteOutput['getIdea']['idea']>}) =>{
    const navigate = useNavigate()
  const updateIdea = trpc.updateIdea.useMutation()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validate: withZodSchema(zUpdateIdeaTrpcInput.omit({ideaId: true})),
    onSubmit: async(value) => {
      try{
      setSubmitError(null)
      await updateIdea.mutateAsync({ideaId: idea.id, ...value})
        navigate(getViewIdeaRoute({ideaNick: value.nick}))
      } catch(error: any){
        setSubmitError(error.message)
      }
    },
  })

  return (
    <Segment title={`Edit idea: ${idea.nick}`}>
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
        <Button loading={formik.isSubmitting}> update a new Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditIdeaPage = () => {

    const {ideaNick} = useParams() as EditIdeaTypeParams
    const getIdeaResult = trpc.getIdea.useQuery({ ideaNick })
    const getMeResult = trpc.getMe.useQuery()      


    
    if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
        return <span>Loading...</span>
      }
    
      if (getIdeaResult.isError) {
        return <span>Error: {getIdeaResult.error.message}</span>
      }
    
      if (getMeResult.isError) {
        return <span>Error: {getMeResult.error.message}</span>
      }
    
      if (!getIdeaResult.data.idea) {
        return <span>Idea not found</span>
      } 
    const idea = getIdeaResult.data.idea
    const me = getMeResult.data.me
      if (!me) {
        return <span>Only for authorized</span>
      }
    
      if (me.id !== idea.authorId) {
        return <span>An idea can only be edited by the author</span>
      }
      return <EditIdeaComponent idea={idea} />
}
