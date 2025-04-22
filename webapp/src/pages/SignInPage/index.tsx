import { Segment } from "../../components/Segment"
import { useFormik } from "formik"
import { useState } from "react"
import { trpc } from "../../lib/trpc"
import { withZodSchema } from "formik-validator-zod"
import { Alert } from "../../components/Alert"
import { Input } from "../../components/Input"
import { FormItems } from "../../components/FormItems"
import { Button } from "../../components/Button"
import { zSignInTrpcInput } from "../../../../backend/src/router/signIn/input"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router"
import { getAllIdeaRoute } from "../../lib/routes"
export const SignInPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signIn = trpc.signIn.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: "",
      password: "",
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async value => {
      try {
        setSubmittingError(null)
        const { token } = await signIn.mutateAsync(value)
        Cookies.set('token', token, {expires: 99999})
        trpcUtils.invalidate()
        navigate(getAllIdeaRoute())
      } catch (error: any) {
        setSubmittingError(error.message)
      }
    },
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
          {!formik.isValid && !!formik.submitCount && (
            <div className="text-red-700">Some fields are invalid!</div>
          )}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
