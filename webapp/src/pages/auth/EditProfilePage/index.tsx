import type { TrpcRouteOutput } from "@app/backend/src/router/index.ts";
import { zUpdateProfileTrpcInput } from "../../../../../backend/src/router/updateProfile/input.ts"
import { zUpdatePasswordTrpcInput } from "../../../../../backend/src/router/updatePassword/input.ts"

import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { FormItems } from "../../../components/FormItems";
import { Input } from "../../../components/Input";
import { Segment } from "../../../components/Segment";
import { useForm } from "../../../lib/form";
import { withPageWrapper } from "../../../lib/pageWrapper";
import { trpc } from "../../../lib/trpc";
import { z } from "zod";

const General = ({me}: {me: NonNullable<TrpcRouteOutput['getMe']['me']>})=>{
    const trpcUtils = trpc.useUtils()
    const updateProfile = trpc.updateProfile.useMutation()
    const {formik, alertProps, btnProps} = useForm({
        initialValues: {
            nick: me.nick,
            name: me.name,
        },
        validationSchema: zUpdateProfileTrpcInput,
        onSubmit: async (values) => {
            const updateMe = await updateProfile.mutateAsync(values)
            trpcUtils.getMe.setData(undefined, {me: updateMe})
        },
        successMessage: 'Profile updated',
        resetOnSuccess: false
    })
    return(

          <form
            onSubmit={e => {
              e.preventDefault()
              formik.handleSubmit()
            }}
            className="rounded-lg  my-28"
          >
            <FormItems>
    <Input label="Nick" name="nick" formik={formik} /> 
    <Input label="Name" name="name" formik={formik} />
              <Alert {...alertProps} />
              <Button {...btnProps}>Update Profile</Button>
            </FormItems>
          </form>

    )
}
const Password = () => {
    const updatePassword = trpc.updatePassword.useMutation()
    const { formik, alertProps, btnProps} = useForm({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            newPasswordAgain: ''
        },
        validationSchema: zUpdatePasswordTrpcInput.extend({
            newPasswordAgain: z.string().min(1)
        }).superRefine((val, ctx)=>{
            if(val.newPassword !== val.newPasswordAgain){
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Passwords must be the same',
                    path: ['newPasswordAgain']
                })
            }
        }),
        onSubmit: async({newPassword, oldPassword})=>{
            await updatePassword.mutateAsync({newPassword, oldPassword})
        },
        successMessage: 'Password updated',
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <FormItems>
    <Input label="Old password" name="oldPassword" type="password" formik={formik} /> 
    <Input label="New password" name="newPassword" type="password" formik={formik} />
    <Input label="New password again" name="newPasswordAgain" type="password" formik={formik} />
              <Alert {...alertProps} />
              <Button {...btnProps}>Update Profile</Button>
            </FormItems>
        </form>
    )
}


export const EditProfilePage = withPageWrapper({
    authorizedOnly: true,
    setProps: ({getAuthorizedMe})=> ({
        me: getAuthorizedMe()
    })
})(({me})=>{
return (
    <>
    <Segment title="Edit Profile">
        <Segment title="General" size={2}>
            <General me={me}/>
        </Segment>
        <Segment title="Password">
            <Password />
        </Segment>
    </Segment>
    </>
)
}
)


