
const getParams = <T extends Record<string, boolean>>(object: T)=>{
    return Object.keys(object).reduce((acc, key)=>({...acc, [key]: `:${key}`}),{}) as Record<keyof T, string>
}

export const getAllIdeaRoute = () => '/'

export const viewParams =  getParams({id: true})
export type viewTypeParams = typeof viewParams

export const getViewIdeaRoute = ({id}: {id: string}) => `/ideas/${id}`  