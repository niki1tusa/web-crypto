import express from "express"
import cors from "cors"
import { applyTrpcToExpressApp } from "./lib/trpc"
import { trpcRouter } from "./router"
import {createAppContext, type AppContext} from "./lib/ctx"
import { applyPassportToExpressApp } from "./lib/passport"


void (async () => {
  let ctx: AppContext | null = null
  try {
  ctx = createAppContext()
  const app = express()
  app.use(cors())

  app.get("/ping", (req, res) => {
    res.send("pong")
  })
  applyPassportToExpressApp(app, ctx)
  await applyTrpcToExpressApp(app, ctx, trpcRouter)

  app.listen(5433, () => {
    console.info("listening at http://localhost:5433")
  })
} catch (error) {
  console.log(error)
  await ctx?.stop()
}
})()

