import _ from "lodash"
import { trpc } from "../../../lib/trpc"
import { zGetIdeasTrpcInput } from "./input"

export const getIdeasTrpcRoute = trpc.procedure
  .input(zGetIdeasTrpcInput)
  .query(async ({ ctx, input }) => {
    const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, '_') : undefined
    const rawIdeas = await ctx.prisma.idea.findMany({
      select: {
        id: true,
        nick: true,
        name: true,
        description: true,
        createdAt: true,
        serialNumber: true,
        _count: {
          select: {
            ideasLikes: true,
          },
        },
      },
      where: !input.search
        ? undefined
        : {
            OR: [
              {
                name: {
                  contains: input.search,
                  mode: 'insensitive'
                }
              },
              {
                nick: {
                  contains: input.search,
                  mode: 'insensitive'
                }
              },
              {
                text: {
                  contains: input.search,
                  mode: 'insensitive'
                }
              },
            ],
          },
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          serialNumber: "desc",
        },
      ],
      cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
      take: input.limit + 1,
      //по умолчанию: input.limit = 10
      // 10 + 1 = 11 идей
    })

    const nextIdea = rawIdeas.at(input.limit) // 11 идея
    const nextCursor = nextIdea?.serialNumber // это проверка что идей не меньше 11
    const rawIdeasExceptNext = rawIdeas.slice(0, input.limit) // 10 идей
    const ideasExceptNext = rawIdeasExceptNext.map(idea => ({
      ..._.omit(idea, ["_count"]),
      totalLikes: idea._count.ideasLikes,
    }))
    return { ideas: ideasExceptNext, nextCursor }
  })
// desc - это свойство которое выстраивает по уменьшению
// сначала идёт сортировка по createdAt, а потом по serialNumber
// nextCursor это id Idea следующей из загруженных записей
