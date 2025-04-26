import express from "express"
import cors from "cors"
import { applyTrpcToExpressApp } from "./lib/trpc"
import { trpcRouter } from "./router"
import {createAppContext, type AppContext} from "./lib/ctx"
import { applyPassportToExpressApp } from "./lib/passport"
import { env } from "./lib/env"
import { presentDb } from "./scripts/presentDb"


void (async () => {
  let ctx: AppContext | null = null
  try {
  ctx = createAppContext()
  await presentDb(ctx)
  const app = express()
  app.use(cors())

  applyPassportToExpressApp(app, ctx)
  await applyTrpcToExpressApp(app, ctx, trpcRouter)

  app.listen(env.PORT, () => {
    console.info(`listening at http://localhost:${env.PORT}`)
  })
} catch (error) {
  console.log(error)
  await ctx?.stop()
}
})()

