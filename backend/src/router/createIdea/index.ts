import { trpc } from "../../lib/trpc"
import { zCreateIdeaTrpcInput } from "./input"

// коппия валидация с frontend для улучшением безопасности

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput)
.mutation( async({ input, ctx }) => {
  if(!ctx.me) {
    throw Error('NOT AUTH')
  }

  const existIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick
    }
  })  

if(existIdea){
 throw Error('Idea with this nick already exist!')
 }
await ctx.prisma.idea.create({
  data: {...input,
    authorId: ctx.me.id
  }
})
  return true
})
 