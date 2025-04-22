import { Link, Outlet } from "react-router"
import * as routes from "../../lib/routes"
import scss from "./index.module.scss"
import { trpc } from "../../lib/trpc"

export const Layout = () => {
  const {data, isLoading, isFetching, isError} = trpc.getMe.useQuery()

  return (
    <div className={scss.layout}>
      <div className={scss.navigation}>
        <div className={scss.logo}>Idea</div>
        <ul className={scss.menu}>
          <li className={scss.item}>
            <Link className={scss.link} to={routes.getAllIdeaRoute()}>
              All Idea
            </Link>
          </li>
{    isLoading || isFetching || isError? null: data.me? (
  <>
   <li className={scss.item}>
            <Link className={scss.link} to={routes.getNewIdeaRoute()}>
              Add Idea
            </Link>
          </li>
          <li className={scss.item}>
            <Link className={scss.link} to={routes.getLogOutRoute()}>
             Log out ({data.me.nick})
            </Link>
          </li>
  </>
):(
  <>
       <li className={scss.item}>
            <Link className={scss.link} to={routes.getSignUpRoute()}>
             Sign Up
            </Link>
          </li>
          <li className={scss.item}>
            <Link className={scss.link} to={routes.getSignInRoute()}>
             Sign In
            </Link>
          </li>
  </>
)     

}
        </ul>
      </div>
      <div className={scss.content}>
        <Outlet />
      </div>
    </div>
  )
}
