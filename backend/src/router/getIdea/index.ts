import { z } from "zod"
import { trpc } from "../../lib/trpc"


/// нужно поменять where: name - на where: nick. Так как name не уникальное
export const getIdeaTrpcRoute = trpc.procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async({ ctx, input }) => {

      const idea = await ctx.prisma.idea.findFirst({
        where: {
          name: input.id
        },
        include: {
          author: {
            select: {
              id: true,
              nick: true
            }
          }
        }
      })
    
      return { idea }
    })

