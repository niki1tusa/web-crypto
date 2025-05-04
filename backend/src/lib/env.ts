import * as dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const zNonEmptyTrimmed = z.string().trim().min(1)
const zNonEmptyTrimmedRequiredOnNotLocal = zNonEmptyTrimmed.optional().refine(
  value=> process.env.HOST_ENV === 'local' || !!value,
  'Required  on local host'
)
const zEnv = z.object({
  PORT: zNonEmptyTrimmed,
  HOST_ENV: z.enum(['local', 'production']),
  DATABASE_URL: zNonEmptyTrimmed,
  JWT_SECRET: zNonEmptyTrimmed,
  PASSWORD_SALT: zNonEmptyTrimmed,
  ADMIN_INITIAL_PASSWORD: zNonEmptyTrimmed,
  WEBAPP_URL: zNonEmptyTrimmed,
  BREVO_API_KEY: zNonEmptyTrimmedRequiredOnNotLocal,
  FROM_EMAIL_NAME: zNonEmptyTrimmed,
  FROM_EMAIL_ADDRESS: zNonEmptyTrimmed,
})


export const env = zEnv.parse(process.env)