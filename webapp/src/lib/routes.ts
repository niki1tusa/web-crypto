const getParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce(
    (acc, key) => ({ ...acc, [key]: `:${key}` }),
    {},
  ) as Record<keyof T, string>
}

export const getAllIdeasRoute = () => "/"

export const viewParams = getParams({ ideaNick: true })
export type ViewTypeParams = typeof viewParams
export const getViewIdeaRoute = ({ ideaNick }: ViewTypeParams) => `/ideas/${ideaNick}`

export const editIdeaParams = getParams({ ideaNick: true })
export type EditIdeaTypeParams = typeof editIdeaParams
export const editIdeaRoute = ({ ideaNick }: EditIdeaTypeParams) => `/ideas/${ideaNick}/edit`

export const getNewIdeaRoute = () => "/ideas/new";

export const getSignUpRoute = () => "/sign-up";

export const getSignInRoute = () => "/sign-in";

export const getLogOutRoute = () => "/log-out"

export const editProfileRoute = () => "/edit-profile"

export const getAllBlockIdeasRoute = () => "/block-ideas"