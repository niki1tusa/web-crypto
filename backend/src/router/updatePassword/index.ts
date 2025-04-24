import { trpc } from "../../lib/trpc";
import { getPasswordHash } from "../../utils/getPasswordHash";
import { zUpdatePasswordTrpcInput } from "./input";



export const updatePasswordTrpcRoute  = trpc.procedure
.input(zUpdatePasswordTrpcInput)
.mutation(async ({ctx, input}) => {
    // if user no authorized:
    if(!ctx.me) {
        throw new Error('ERRRRRROORR auth')
    }
    // 
    if(ctx.me.password !== getPasswordHash(input.oldPassword)){
throw new Error('Wrong old password')
}

    const updateMe = await ctx.prisma.user.update({
        where: {
            id: ctx.me.id
        },
        data: {
            password: getPasswordHash(input.newPassword)
        }
    })
    ctx.me = updateMe
    return true
})