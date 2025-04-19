import express from "express"
import cors from "cors"
import { applyTrpcToExpressApp } from "./lib/trpc"
import { trpcRouter } from "./router"
import { AppContext, createAppContext } from "./lib/ctx"


void (async () => {
  let ctx: AppContext | null = null
  try {
  ctx = createAppContext()
  const app = express()
  app.use(cors())

  app.get("/ping", (req, res) => {
    res.send("pong")
  })

  await applyTrpcToExpressApp(app, ctx, trpcRouter)

  app.listen(5433, () => {
    console.info("listening at http://localhost:5433")
  })
} catch (error) {
  console.log(error)
  await ctx?.stop()
}
})()

