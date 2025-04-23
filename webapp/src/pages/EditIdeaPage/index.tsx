import { useNavigate, useParams } from "react-router"
import { EditIdeaTypeParams, getViewIdeaRoute } from "../../lib/routes"
import { trpc } from "../../lib/trpc"
import type {TrpcRouteOutput} from '../../.././../backend/src/router/index.ts'
import { Alert } from "../../components/Alert/index.tsx"
import { Button } from "../../components/Button/index.tsx"
import { FormItems } from "../../components/FormItems/index.tsx"
import { Input } from "../../components/Input/index.tsx"
import { Segment } from "../../components/Segment/index.tsx"
import { Textarea } from "../../components/Textarea/index.tsx"
import { zUpdateIdeaTrpcInput } from "../../../../backend/src/router/updateIdea/input.ts"
import { pick } from "lodash"
import { useForm } from "../../lib/form.tsx"

// omit это обратная функция от extend от ZOD (omit выкидывает свойство)
const EditIdeaComponent = ({idea}: {idea: NonNullable<TrpcRouteOutput['getIdea']['idea']>}) =>{
    const navigate = useNavigate()
  const updateIdea = trpc.updateIdea.useMutation()


  const {formik, alertProps, btnProps} = useForm({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ideaId: true}),
    onSubmit: async(value) => {
      await updateIdea.mutateAsync({ideaId: idea.id, ...value})
        navigate(getViewIdeaRoute({ideaNick: value.nick}))
    },
    resetOnSuccess: false,
    showValidationAlert: true
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
<Alert {...alertProps}/>
<Button {...btnProps}>Update Idea</Button>
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
