import { trpc } from "../../lib/trpc"
import { ideas } from "../../lib/ideas"
import { zCreateIdeaTrpcInput } from "./input"

// копия валидация с frontend для уоучшения безопасности

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput)
.mutation(({ input }) => {
  ideas.unshift(input)
  return true
})
 