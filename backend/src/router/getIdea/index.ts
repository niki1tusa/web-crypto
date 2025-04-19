import { z } from "zod"
import { trpc } from "../../lib/trpc"
import { ideas } from "../../lib/ideas"

export const getIdeaTrpcRoute = trpc.procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async({ ctx, input }) => {
      const idea = await ctx.prisma.idea.findUnique({
        where: {
          nick: input.id
        }
      })
      return { idea }
    })

