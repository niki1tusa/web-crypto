import { Idea, User, UserPermission } from "@prisma/client"

// пользователь или нет
type MaybeUser = Pick<User, 'permissions' | 'id'> | null
type MaybeIdea = Pick<Idea, 'authorId'> | null

const hasPermission = (user: MaybeUser, permissions: UserPermission)=>{
    // имеет права на что-то конкретное или все доступные права или false
    return user?.permissions.includes(permissions) || user?.permissions.includes('ALL') || false
}
// fnc:
//1) block idea
export const canBlockIdea = (user: MaybeUser) => {
return hasPermission(user, 'BLOCK_IDEAS')
}
// 2) unblock idea
export const canUnBlockIdea = (user: MaybeUser) => {
    return hasPermission(user, 'UN_BLOCK_IDEAS')
}
// может ли изменять идею
export const canEditIdea = (user: MaybeUser, idea: MaybeIdea)=>{
    return !!user && !!idea && user?.id === idea?.authorId
}