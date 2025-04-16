import { z } from "zod"
import { trpc } from "../../lib/trpc"
import { ideas } from "../../lib/ideas"

export const getIdeaTrpcRoute = trpc.procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ input }) => {
      const idea = ideas.find(item => item.id === input.id)
      console.log("hello")
      return { idea: idea || null }
    })

