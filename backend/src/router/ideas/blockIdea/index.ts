import { sendBlockedIdeaEmail } from "../../../lib/email";
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
        },
        include: {
            author: true
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
    void sendBlockedIdeaEmail({user: idea.author, idea})
    return true
})