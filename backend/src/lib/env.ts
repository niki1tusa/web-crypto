import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const zEnv = z.object({
  PORT: z.string().trim().min(1),
  DATABASE_URL: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(1),
  PASSWORD_SALT: z.string().trim().min(1),
  ADMIN_INITIAL_PASSWORD: z.string().trim().min(1),
  WEBAPP_URL: z.string().trim().min(1),
  BREVO_API_KEY: z.string().trim().min(1),
  FROM_EMAIL_NAME: z.string().trim().min(1),
  FROM_EMAIL_ADDRESS: z.string().trim().min(1),
})


export const env = zEnv.parse(process.env)