import { initTRPC } from "@trpc/server"
const ideas = [
  {
    id: 1,
    name: "text1",
    description: "this is description with idea!",
  },
  {
    id: 2,
    name: "text2",
    description: "this is description with idea!",
  },
  {
    id: 3,
    name: "text3",
    description: "this is description with idea!",
  },
  {
    id: 4,
    name: "text4",
    description: "this is description with idea!",
  },
  {
    id: 5,
    name: "text5",
    description: "this is description with idea!",
  },
]

const trpc = initTRPC.create()
export const trpcRouter = trpc.router({
  getData: trpc.procedure.query(() => {
    return { ideas }
  }),
})

export type TrpcRouter = typeof trpcRouter
