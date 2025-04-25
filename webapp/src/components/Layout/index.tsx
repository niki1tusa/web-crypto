import { Link, Outlet } from "react-router"
import * as routes from "../../lib/routes"
import scss from "./index.module.scss"

import { useMe } from "../../lib/ctx"
import { createRef } from "react"


export const layoutContentRef = createRef<HTMLDivElement>()
export const Layout = () => {
  const me = useMe()
  return (
    <div className={scss.layout}>
      <div className={scss.navigation}>
        <div className={scss.logo}>Idea</div>
        <ul className={scss.menu}>
          <li className={scss.item}>
            <Link className={scss.link} to={routes.getAllIdeasRoute()}>
              All Idea
            </Link>
          </li>
{ me? (
  <>
   <li className={scss.item}>
            <Link className={scss.link} to={routes.getNewIdeaRoute()}>
              Add Idea
            </Link>
          </li>
          <li className={scss.item}>
            <Link className={scss.link} to={routes.editProfileRoute()}>
              Edit Profile
            </Link>
          </li>
          <li className={scss.item}>
            <Link className={scss.link} to={routes.getLogOutRoute()}>
             Log out ({me.nick})
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
      <div className={scss.content} ref={layoutContentRef}>
        <Outlet />
      </div>
    </div>
  )
}
