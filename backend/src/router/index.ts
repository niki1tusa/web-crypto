import { trpc } from "../lib/trpc"
// @index('./**/index.ts', f=>`import{ ${f.path.split('/').slice(0,-1).pop()}TrpcRoute } from '${f.path.split('/').slice(0,-1).join('/')}';`)
import{ createIdeaTrpcRoute } from './createIdea';
import{ getIdeaTrpcRoute } from './getIdea';
import{ getIdeasTrpcRoute } from './getIdeas';
import{ getMeTrpcRoute } from './getMe';
import{ signInTrpcRoute } from './signIn';
import{ signUpTrpcRoute } from './signUp';
// @endindex

export const trpcRouter = trpc.router({
// @index('./**/index.ts', f=>`${f.path.split('/').slice(0,-1).pop()}: ${f.path.split('/').slice(0,-1).pop()}TrpcRoute,`)
createIdea: createIdeaTrpcRoute,
getIdea: getIdeaTrpcRoute,
getIdeas: getIdeasTrpcRoute,
getMe: getMeTrpcRoute,
signIn: signInTrpcRoute,
signUp: signUpTrpcRoute,
// @endindex
})

// run depend Generate index: "CTRL + 7" !!!!!!

export type TrpcRouter = typeof trpcRouter
