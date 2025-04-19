import { trpc } from "../../lib/trpc"
import { ideas } from "../../lib/ideas"
import { zCreateIdeaTrpcInput } from "./input"

// коппия валидация с frontend для улучшением безопасности

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput)
.mutation( async({ input, ctx }) => {

  const existIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick
    }
  })
if(existIdea){
 throw Error('Idea with this nick already exist!')
 }
await ctx.prisma.idea.create({
  data: input
})
  return true
})
 