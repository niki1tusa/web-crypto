import { sendWelcomeEmail } from "../../../lib/email"
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
 throw Error('User with this nick already exist!')
 }
 const existUserMail = await ctx.prisma.user.findUnique({
  where: {
    email: input.email
  }
})
if(existUserMail){
throw Error('User with this mail already exist!')
}
const user = await ctx.prisma.user.create({
  data: {
    nick: input.nick,
    email: input.email,
    password: getPasswordHash(input.password)
  }
})
  console.log({user})
  void sendWelcomeEmail({user})
  const token = signJWT(user.id)
  return {token}
})