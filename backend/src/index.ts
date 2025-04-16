import express from "express"
import cors from "cors"
import { applyTrpcToExpressApp } from "./lib/trpc"
import { trpcRouter } from "./router"

export const app = express()
app.use(cors())

app.get("/ping", (req, res) => {
  res.send("pong")
})

applyTrpcToExpressApp(app, trpcRouter)

app.listen(5433, () => {
  console.info("listening at http://localhost:5433")
})
