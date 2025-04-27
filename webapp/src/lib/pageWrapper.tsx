import {
  UseTRPCQueryResult,
  UseTRPCQuerySuccessResult,
} from "@trpc/react-query/shared"
import { AppContext, useAppContext } from "./ctx"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { getAllIdeasRoute } from "./routes"
import { ErrorPageComponent } from "../components/ErrorPageCompnent"
import { NotFoundPage } from "../pages/other/NotFoundPage"
import { Loader } from "../components/Loader"

// class
class CheckExistError extends Error{}
const checkExistFnc = <T,>(value: T, message?: string): NonNullable<T> => {
    if(!value){
        throw new CheckExistError(message)
    }
    return value
}
class CheckAccessError extends Error{}
const checkAccessFnc = <T,>(value: T, message?: string): NonNullable<T> => {
    if(!value){
        throw new CheckAccessError(message)
    }
    return value
}

class GetAuthorizedMeError extends Error{}

//type
type Props = Record<string, any>
type QueryResult = UseTRPCQueryResult<any, any>
type QuerySuccessResult<TQueryResult extends QueryResult> =
  UseTRPCQuerySuccessResult<NonNullable<TQueryResult["data"]>, null>
type HelperProps<TQueryResult extends QueryResult | undefined> = {
  ctx: AppContext
  queryResult: TQueryResult extends QueryResult
    ? QuerySuccessResult<TQueryResult>
    : undefined
}
type SetPropsProps<TQueryResult extends QueryResult | undefined> = HelperProps<TQueryResult>&{
    checkExist: typeof checkExistFnc
    checkAccess: typeof checkAccessFnc
    getAuthorizedMe: (message?: string)=> NonNullable<AppContext['me']>
}
type PageWrapperProps<
  TProps extends Props,
  TQueryResult extends QueryResult | undefined,
> = {
  redirectAuthorized?: boolean
  authorizedOnly?: boolean
  authorizedOnlyTitle?: string
  authorizedOnlyMessage?: string
  checkAccess?: (helperProps: HelperProps<TQueryResult>) => boolean
  checkAccessTitle?: string
  checkAccessMessage?: string
  checkExist?: (helperProps: HelperProps<TQueryResult>) => boolean
  checkExistTitle?: string
  checkExistMessage?: string
  showLoaderOnFetching?: boolean
  useQuery?: () => TQueryResult
  setProps?: (setPropsProps: SetPropsProps<TQueryResult>) => TProps
  Page: React.FC<TProps>
}

const PageWrapper = <
  TProps extends Props = {},
  TQueryResult extends QueryResult | undefined = undefined,
>({
  authorizedOnly,
  authorizedOnlyTitle = "Please, Authorize",
  authorizedOnlyMessage = "This page is available only for authorized users",
  redirectAuthorized,
  checkAccess,
  checkAccessTitle = "Access Denied",
  checkAccessMessage = "You have no access to this page",
  checkExist,
  checkExistTitle,
  checkExistMessage,
  useQuery,
  setProps,
  Page,
  showLoaderOnFetching = true,
}: PageWrapperProps<TProps, TQueryResult>) => {
  const navigate = useNavigate()
  const ctx = useAppContext()
  const queryResult = useQuery?.()
  // если пользователь авторизован то редирект не надо
  const redirectNeeded = redirectAuthorized && ctx.me

  useEffect(() => {
    if (redirectNeeded) {
      navigate(getAllIdeasRoute(), { replace: true })
    }
  }, [redirectNeeded, navigate])

  if (queryResult?.isLoading ||(showLoaderOnFetching && queryResult?.isFetching )|| redirectNeeded) {
    return <Loader type="page"/>
  }

  if (queryResult?.isError) {
    return <ErrorPageComponent message={queryResult.error.message} />
  }

  if (authorizedOnly && !ctx.me) {
    return (
      <ErrorPageComponent
        title={authorizedOnlyTitle}
        message={authorizedOnlyMessage}
      />
    )
  }

  const helperProps = { ctx, queryResult: queryResult as never }

  if (checkAccess) {
    const accessDenied = !checkAccess(helperProps)
    if (accessDenied) {
      return (
        <NotFoundPage
          title={checkAccessTitle}
          message={checkAccessMessage}
        />
      )
    }
  }

  if (checkExist) {
    const notExists = !checkExist(helperProps)
    if (notExists) {
      return (
        <NotFoundPage
          title={checkExistTitle}
          message={checkExistMessage}
        />
      )
    }
  }
  const getAuthorizedMe = (message?: string)=>{
    if(!ctx.me){
      throw new GetAuthorizedMeError(message)
    }
    return ctx.me
  }
try {
    const props = setProps?.({...helperProps, checkExist: checkExistFnc, checkAccess: checkAccessFnc, getAuthorizedMe,}) as TProps
    return (
          <Page {...props}/> 
)
} catch(error) {
    if(error instanceof CheckExistError){
        return <ErrorPageComponent title={checkExistTitle} message={error.message || checkExistMessage}/>
    }
    if(error instanceof CheckAccessError){
        return <ErrorPageComponent title={checkAccessTitle} message={error.message || checkAccessMessage}/>
    }
    if(error instanceof GetAuthorizedMeError){
      return <ErrorPageComponent title={authorizedOnlyTitle} message={error.message || authorizedOnlyMessage}/>
  }
    throw error
}
}


export const withPageWrapper = <
  TProps extends Props = {},
  TQueryResult extends QueryResult | undefined = undefined,
>(
  pageWrapperProps: Omit<PageWrapperProps<TProps, TQueryResult>, "Page">,
) => {
  return (Page: PageWrapperProps<TProps, TQueryResult>["Page"]) => {
    return () => <PageWrapper {...pageWrapperProps} Page={Page} />
  }
}
// Page это 90% props так как это страница (EditPage, AllIdeasPage)
