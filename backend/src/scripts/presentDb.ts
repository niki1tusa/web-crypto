import { AppContext } from "../lib/ctx";
import { env } from "../lib/env";
import { getPasswordHash } from "../utils/getPasswordHash";

// если upsert не найдёт user с nick admin, то он его создаст
export const presentDb = async(ctx: AppContext)=>{
    await ctx.prisma.user.upsert({
        where:{
            nick: 'admin'
        },
        create:{
            nick: 'admin',
            email: "admin@example.com",
            password: getPasswordHash(env.ADMIN_INITIAL_PASSWORD),
            permissions: ['ALL']
        },
        update: {
            permissions: ['ALL']
        }
    })
}