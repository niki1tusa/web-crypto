import { Segment } from "../../../components/Segment"
import { trpc } from "../../../lib/trpc"
import { Alert } from "../../../components/Alert"
import { Input } from "../../../components/Input"
import { FormItems } from "../../../components/FormItems"
import { Button } from "../../../components/Button"
import Cookies from "js-cookie"
import { useForm } from "../../../lib/form"
import { withPageWrapper } from "../../../lib/pageWrapper"
import { zSignInTrpcInput } from "../../../../../backend/src/router/auth/signIn/input"

export const SignInPage = withPageWrapper({
redirectAuthorized: true
})(() => {
  const trpcUtils = trpc.useUtils()
  const signIn = trpc.signIn.useMutation()
  const { formik, btnProps, alertProps } = useForm({
    initialValues: {
      nick: "",
      password: "",
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async value => {
      const { token } = await signIn.mutateAsync(value)
      Cookies.set("token", token, { expires: 99999 })
      trpcUtils.invalidate()
    },
    resetOnSuccess: false,
  })

  return (
    <Segment title="Sign In">
      <form
        onSubmit={e => {
          e.preventDefault()
          formik.handleSubmit()
        }}
        className="rounded-lg  my-28"
      >
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            formik={formik}
            type="password"
          />
          <Alert {...alertProps} />
          <Button {...btnProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
