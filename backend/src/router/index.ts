import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { trpc } from "../lib/trpc"
// @index('./**/index.ts', f=>`import{ ${f.path.split('/').slice(0,-1).pop()}TrpcRoute } from '${f.path.split('/').slice(0,-1).join('/')}';`)
import{ getMeTrpcRoute } from './auth/getMe';
import{ signInTrpcRoute } from './auth/signIn';
import{ signUpTrpcRoute } from './auth/signUp';
import{ blockIdeaTrpcRoute } from './ideas/blockIdea';
import{ createIdeaTrpcRoute } from './ideas/createIdea';
import{ getIdeaTrpcRoute } from './ideas/getIdea';
import{ getIdeasTrpcRoute } from './ideas/getIdeas';
import{ setIdeaLikeTrpcRoute } from './ideas/setIdeaLike';
import{ updateIdeaTrpcRoute } from './ideas/updateIdea';
import{ updatePasswordTrpcRoute } from './updatePassword';
import{ updateProfileTrpcRoute } from './updateProfile';
// @endindex

export const trpcRouter = trpc.router({
// @index('./**/index.ts', f=>`${f.path.split('/').slice(0,-1).pop()}: ${f.path.split('/').slice(0,-1).pop()}TrpcRoute,`)
getMe: getMeTrpcRoute,
signIn: signInTrpcRoute,
signUp: signUpTrpcRoute,
blockIdea: blockIdeaTrpcRoute,
createIdea: createIdeaTrpcRoute,
getIdea: getIdeaTrpcRoute,
getIdeas: getIdeasTrpcRoute,
setIdeaLike: setIdeaLikeTrpcRoute,
updateIdea: updateIdeaTrpcRoute,
updatePassword: updatePasswordTrpcRoute,
updateProfile: updateProfileTrpcRoute,
// @endindex
})

// run depend Generate index: "CTRL + 7" !!!!!!

export type TrpcRouter = typeof trpcRouter
export type TrpcRouteInput = inferRouterInputs<TrpcRouter>
export type TrpcRouteOutput = inferRouterOutputs<TrpcRouter>
