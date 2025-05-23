const getParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce(
    (acc, key) => ({ ...acc, [key]: `:${key}` }),
    {},
  ) as Record<keyof T, string>
}

export const getAllIdeaRoute = () => "/"

export const viewParams = getParams({ id: true })
export type viewTypeParams = typeof viewParams

export const getViewIdeaRoute = ({ id }: { id: string }) => `/ideas/${id}`

export const getNewIdeaRoute = () => "/ideas/new";

export const getSignUpRoute = () => "/sign-up";

export const getSignInRoute = () => "/sign-in";

export const getLogOutRoute = () => "/log-out"