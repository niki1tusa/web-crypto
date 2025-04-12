import express from "express"
import * as trcpExpress from "@trpc/server/adapters/express"
import { trpcRouter } from "./trpc"
import cors from "cors"

const app = express()
app.use(cors())

app.get("/ping", (req, res) => {
  res.send("pong")
})

app.use(
  "/trpc",
  trcpExpress.createExpressMiddleware({
    router: trpcRouter,
  }),
)

app.listen(5433, () => {
  console.info("listening at http://localhost:5433")
})
