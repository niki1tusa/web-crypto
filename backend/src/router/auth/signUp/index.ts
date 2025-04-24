import { trpc } from "../../../lib/trpc"
import { getPasswordHash } from "../../../utils/getPasswordHash"
import { signJWT } from "../../../utils/signJWT"
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
const user = await ctx.prisma.user.create({
  data: {
    nick: input.nick,
    password: getPasswordHash(input.password)
  }
})
  const token = signJWT(user.id)
  return {token}
})