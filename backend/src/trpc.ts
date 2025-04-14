import { initTRPC } from "@trpc/server"
import _ from "lodash"
import { z } from "zod"
const ideas = _.times(100, i => ({
  id: `${i}`,
  name: `text ${i} `,
  description: `this is description with idea ${i}!`,
  text: _.times(100, j => `<p>Text paragrph ${j}/....</p>`).join(""),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getData: trpc.procedure.query(() => {
    return {
      ideas: ideas.map(item => _.pick(item, ["id", "name", "description"])),
    }
  }),
  getIdea: trpc.procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ input }) => {
      const idea = ideas.find(item => item.id === input.id)
      console.log("hello")
      return { idea: idea || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
