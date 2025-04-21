import { trpc } from "../../lib/trpc"
import { getPasswordHash } from "../../utils/getPasswordHash"
import { zSignUpTrpcInput } from "./input"




export const signUpTrpcRoute = trpc.procedure.input(zSignUpTrpcInput)
.mutation( async({ ctx, input }) => {

  const existUser = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick
    }
  })
if(existUser){
 throw Error('Nick with this nick already exist!')
 }
await ctx.prisma.user.create({
  data: {
    nick: input.nick,
    password: getPasswordHash(input.password)
  }
})
  return true
})