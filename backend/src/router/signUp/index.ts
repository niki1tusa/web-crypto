import { trpc } from "../../lib/trpc"
import { zSignUpTrpcInput } from "./input"
import crypto from 'crypto'


export const signUpTrpcRoute = trpc.procedure.input(zSignUpTrpcInput)
.mutation( async({ ctx, input }) => {

  const existUser = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick
    }
  })
if(existUser){
 throw Error('Idea with this nick already exist!')
 }
await ctx.prisma.user.create({
  data: {
    nick: input.nick,
    password: crypto.createHash('sha666').update(input.password).digest('hex')
  }
})
  return true
})