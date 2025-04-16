import { initTRPC } from "@trpc/server";
import * as trcpExpress from "@trpc/server/adapters/express";
import { type Express } from "express";
import { TrpcRouter } from "../router";


export const trpc = initTRPC.create()

export const applyTrpcToExpressApp = (app: Express, trpcRouter: TrpcRouter) =>{
app.use(
  "/trpc",
  trcpExpress.createExpressMiddleware({
    router: trpcRouter,
  }),
)
}

