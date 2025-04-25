import { trpc } from "../../../lib/trpc";
import { zSetIdeaLikeTrpcInput } from "./input";

export const setIdeaLikeTrpcRoute = trpc.procedure.input(zSetIdeaLikeTrpcInput).mutation(async ({ctx, input}) => {
    const {ideaId, isLikedByMe} = input
    if(!ctx.me){
        throw new Error('UN_AUTHORIZED')
    }
    const idea = await ctx.prisma.idea.findUnique({
        where: {
            id: ideaId
        }
    })
    if(!idea){
        throw new Error('UN_AUTHORIZED')
    }
  if(isLikedByMe){
    await ctx.prisma.ideaLike.upsert({
        where: {
            ideaId_userId:{
                ideaId,
                userId: ctx.me.id
            }
        },
        create: {
            userId: ctx.me.id,
            ideaId
        },
        update: {}
    })
  }  else{
    await ctx.prisma.ideaLike.delete({
        where: {
            ideaId_userId:{
                ideaId,
                userId: ctx.me?.id
            }
        },
    })
  }
  const totalLikes = await ctx.prisma.ideaLike.count({
    where:{
        ideaId
    }
  })
  return {
    idea: {
        id: idea?.id,
        totalLikes,
        isLikedByMe
    }
  }
})