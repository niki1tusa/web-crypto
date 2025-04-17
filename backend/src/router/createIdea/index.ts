import { trpc } from "../../lib/trpc"
import { ideas } from "../../lib/ideas"
import { zCreateIdeaTrpcInput } from "./input"

// коппия валидация с frontend для улучшением безопасности

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput)
.mutation(({ input }) => {
  if(ideas.find(idea=> idea.nick === input.nick )){
    throw Error('Idea with this nick already exist!')
  }
  ideas.unshift(input)
  return true
})
 