import { trpc } from "../../../lib/trpc"
import { zGetIdeasTrpcInput } from "./input"

export const getIdeasTrpcRoute = trpc.procedure.input(zGetIdeasTrpcInput).query(async({ctx, input}) => {
    const ideas = await ctx.prisma.idea.findMany({
      select:{
        id: true,
        nick: true,
        name: true,
        description: true,
        createdAt: true,
        serialNumber: true
      },
      orderBy:[ {
        createdAt: 'desc'
      },
    {
      serialNumber: 'desc'
    }
    ],
      cursor: input.cursor ? {serialNumber: input.cursor}: undefined,
      take: input.limit + 1
      //по умолчанию: input.limit = 10 
      // 10 + 1 = 11 идей
    })
    const nextIdea = ideas.at(input.limit) // 11 идея
    const nextCursor = nextIdea?.serialNumber// это проверка что идей не меньше 11
    const ideasExceptNext = ideas.slice(0, input.limit) // 10 идей
    return { ideas: ideasExceptNext, nextCursor }
  })
// desc - это свойство которое выстраивает по уменьшению 
// сначала идёт сортировка по createdAt, а потом по serialNumber
// nextCursor это id Idea следующей из загруженных записей