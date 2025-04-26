import { trpc } from "../../../lib/trpc";
import { canBlockIdea } from "../../../utils/can";
import { ZBlockIdeaTrpcInput } from "./input";


export const blockIdeaTrpcRoute = trpc.procedure.input(ZBlockIdeaTrpcInput).mutation(async({ctx, input})=>{
    const {ideaId} = input
    if(!canBlockIdea(ctx.me)){
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
            blockedAt: new Date()
        }
    })
    return true
})