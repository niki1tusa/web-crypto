import { Segment } from "../../components/Segment"
import { zSignUpTrpcInput } from "../../../../backend/src/router/signUp/input"
import { useFormik } from "formik"
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
import { useForm } from "../../lib/form"

export const SignUpPage = () => {
  const trpcUtils = trpc.useUtils()
  const navigate = useNavigate()
  const signUp = trpc.signUp.useMutation()
  
  const { formik, alertProps, btnProps } = useForm({
    initialValues: {
      nick: "",
      password: "",
      passwordAgain: "",
    },
    validationSchema: zSignUpTrpcInput
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

    onSubmit: async value => {
      const { token } = await signUp.mutateAsync(value)
      Cookies.set("token", token, { expires: 999999 })
      trpcUtils.invalidate()
      navigate(getAllIdeaRoute())
    },
    resetOnSuccess: false
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
          <Alert {...alertProps} />
          <Button {...btnProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
