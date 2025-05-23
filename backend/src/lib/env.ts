import * as dotenv from 'dotenv'
import {z} from 'zod'

dotenv.config()

const zEnv = z.object({
    PORT: z.string().trim().min(1),
    DATABASE_URL: z.string().trim().min(1),
    JWT_SECRET: z.string().trim().min(1),
})

export const env = zEnv.parse(process.env)