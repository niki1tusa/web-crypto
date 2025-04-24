import { Segment } from "../../../components/Segment"
import { Input } from "../../../components/Input"
import { Textarea } from "../../../components/Textarea"
import { trpc } from "../../../lib/trpc"
import { Alert } from "../../../components/Alert"
import { Button } from "../../../components/Button"
import { FormItems } from "../../../components/FormItems"
import { useForm } from "../../../lib/form"
import { withPageWrapper } from "../../../lib/pageWrapper"
import { zCreateIdeaTrpcInput } from "@app/backend/src/router/createIdea/input"

export const NewIdeaPage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createIdea = trpc.createIdea.useMutation()

  const { formik, btnProps, alertProps } = useForm({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validationSchema: zCreateIdeaTrpcInput,
    onSubmit: async values => {
      await createIdea.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: "Idea Created",
    showValidationAlert: true,
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
          <Input
            label="Description"
            name="description"
            formik={formik}
            maxWidth={500}
          />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...btnProps}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
