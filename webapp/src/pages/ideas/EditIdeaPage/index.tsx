import { useNavigate, useParams } from "react-router"
import { getViewIdeaRoute, ViewTypeParams } from "../../../lib/routes"
import { trpc } from "../../../lib/trpc"
import { Alert } from "../../../components/Alert/index.tsx"
import { Button } from "../../../components/Button/index.tsx"
import { FormItems } from "../../../components/FormItems/index.tsx"
import { Input } from "../../../components/Input/index.tsx"
import { Segment } from "../../../components/Segment/index.tsx"
import { Textarea } from "../../../components/Textarea/index.tsx"
import { zUpdateIdeaTrpcInput } from "../../../../../backend/src/router/ideas/updateIdea/input.ts"
import { pick } from "lodash"
import { useForm } from "../../../lib/form.tsx"
import { withPageWrapper } from "../../../lib/pageWrapper.tsx"

// omit это обратная функция от extend от ZOD (omit выкидывает свойство)
export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: ()=>{
  const { ideaNick } = useParams() as ViewTypeParams
  return trpc.getIdea.useQuery({ideaNick})
  },
  setProps: ({queryResult, ctx, checkAccess, checkExist}) => {
    const idea = checkExist(queryResult.data.idea, 'idea not found')
    checkAccess(ctx.me?.id === idea.authorId, 'An idea can only be edited by the author')
    return {
      idea
    }
  },
})(({idea}) =>{
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
})

