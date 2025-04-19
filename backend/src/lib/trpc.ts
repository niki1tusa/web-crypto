import { initTRPC } from "@trpc/server";
import * as trcpExpress from "@trpc/server/adapters/express";
import { type Express } from "express";
import { TrpcRouter } from "../router";
import { AppContext } from "./ctx";
import superjson from "superjson";
import { expressHandler } from 'trpc-playground/handlers/express';


export const trpc = initTRPC.context<AppContext>().create({
  transformer: superjson
})

export const applyTrpcToExpressApp = async (app: Express, appContext: AppContext,trpcRouter: TrpcRouter) =>{


  const trpcApiEndpoint = '/trpc'
  const playgroundEndpoint = '/trpc-playground'

app.use(
  trpcApiEndpoint,
  trcpExpress.createExpressMiddleware({
    router: trpcRouter,
    createContext: ()=> appContext,
  }),
)
app.use(
  playgroundEndpoint,
  await expressHandler({
    trpcApiEndpoint,
    playgroundEndpoint,
    router: trpcRouter,
    request: {
      superjson: true
    }
  })
)

}

