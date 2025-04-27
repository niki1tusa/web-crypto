import { trpc } from "../../../lib/trpc";
import { zSetIdeaLikeTrpcInput } from "./input";

export const setIdeaLikeTrpcRoute = trpc.procedure.input(zSetIdeaLikeTrpcInput).mutation(async ({ctx, input}) => {
    const {ideaId, isLikedByMe} = input
    if(!ctx.me){
        throw new Error('UN_AUTHORIZED')
    }
    // Check if idea exists
    const idea = await ctx.prisma.idea.findUnique({
        where: {
            id: ideaId
        }
    })
    if(!idea){
        throw new Error('IDEA_NOT_FOUND')
    }
    // Check if like already exists
    const existingLike = await ctx.prisma.ideaLike.findUnique({
        where: {
            ideaId_userId: {
                ideaId,
                userId: ctx.me.id
            }
        }
    });
    if(isLikedByMe) {
        // If like should be set and doesn't exist yet
        if (!existingLike) {
            await ctx.prisma.ideaLike.create({
                data: {
                    userId: ctx.me.id,
                    ideaId
                }
            });
        }
        // If like already exists, do nothing
    } else {
        // If like should be removed and exists
        if (existingLike) {
            await ctx.prisma.ideaLike.delete({
                where: {
                    ideaId_userId: {
                        ideaId,
                        userId: ctx.me.id
                    }
                }
            });
        }
        // If like doesn't exist, do nothing
    }
    // Count total likes
    const totalLikes = await ctx.prisma.ideaLike.count({
        where: {
            ideaId
        }
    });
    
    return {
        idea: {
            id: idea.id,
            totalLikes,
            isLikedByMe
        }
    }
})
