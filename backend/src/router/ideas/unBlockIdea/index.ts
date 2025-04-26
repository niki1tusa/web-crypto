
import { trpc } from "../../../lib/trpc";
import { canUnBlockIdea } from "../../../utils/can";
import { ZUnBlockIdeaTrpcInput } from "./input";


export const unBlockIdeaTrpcRoute = trpc.procedure.input(ZUnBlockIdeaTrpcInput).mutation(async({ctx, input})=>{
    const {ideaId} = input
    if(!canUnBlockIdea(ctx.me)){
        throw new Error('PERMISSION_DENIED')
    }
    const idea = await ctx.prisma.idea.findUnique({
        where: {
            id: ideaId
        }
    })
    if(!idea) {
        throw new Error('NOT_FOUND')
    }
    await ctx.prisma.idea.update({
        where: {
            id: ideaId
        },
        data: {
            blockedAt: null
        }
    })
    return true
})