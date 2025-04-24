import { toClientMe } from "../../lib/models";
import { trpc } from "../../lib/trpc";
import { zUpdateProfileTrpcInput } from "./input";


export const updateProfileTrpcRoute = trpc.procedure.input(zUpdateProfileTrpcInput).mutation(async ({ctx, input}) => {
    // if user no authorized:
    if(!ctx.me) {
        throw new Error('ERRRRRROORR auth')
    }
    // если изменёный nick уже занят:
    if(ctx.me.nick !== input.nick){
        const exUser = await ctx.prisma.user.findUnique({
            where: {
                nick: input.nick
            }
        })
        if(exUser){
            throw new Error('User with this nick already exists')
        }
    }
    const updateMe = await ctx.prisma.user.update({
        where: {
            id: ctx.me.id
        },
        data: input
    })
    ctx.me = updateMe
    return toClientMe(updateMe)
})