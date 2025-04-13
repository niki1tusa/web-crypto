import { Link, Outlet } from "react-router"
import * as routes from "../../lib/routes"
import scss from "./index.module.scss"

export const Layout = () => {
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
          <li className={scss.item}>
            <Link className={scss.link} to={routes.getNewIdeaRoute()}>
              Add Idea
            </Link>
          </li>
        </ul>
      </div>
      <div className={scss.content}>
        <Outlet />
      </div>
    </div>
  )
}
