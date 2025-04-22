import { Segment } from "../../components/Segment"
import { zSignUpTrpcInput } from "../../../../backend/src/router/signUp/input"
import { useFormik } from "formik"
import { useState } from "react"
import { trpc } from "../../lib/trpc"
import { withZodSchema } from "formik-validator-zod"
import { Alert } from "../../components/Alert"
import { Input } from "../../components/Input"
import { FormItems } from "../../components/FormItems"
import { Button } from "../../components/Button"
import z from "zod"
import Cookies from "js-cookie"
import { useNavigate } from "react-router"
import { getAllIdeaRoute } from "../../lib/routes"

export const SignUpPage = () => {
  const trpcUtils = trpc.useUtils()
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: "",
      password: "",
      passwordAgain: "",
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "password must be the same",
              path: ["passwordAgain"],
            })
          }
        }),
    ),
    onSubmit: async value => {
      try {
        setSubmittingError(null)
        const { token } = await signUp.mutateAsync(value)
        Cookies.set("token", token, { expires: 999999 })
        trpcUtils.invalidate()
        navigate(getAllIdeaRoute())
      } catch (error: any) {
        setSubmittingError(error.message)
      }
    },
  })

  return (
    <Segment title="Sign Up">
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
            label="password"
            name="password"
            formik={formik}
            type="password"
          />
          <Input
            label="password"
            name="passwordAgain"
            formik={formik}
            maxWidth={500}
            type="password"
          />
          {!formik.isValid && !!formik.submitCount && (
            <div className="text-red-700">Some fields are invalid!</div>
          )}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}> Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
