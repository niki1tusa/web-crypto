import cn from "classnames"
import scss from "./index.module.scss"
export const Loader = ({ type }: { type: "page" | "section" }) => {
 return (<span
    className={cn({
      [scss.loader]: true,
      [scss[`type-${type}`]]: true,
    })}
  />)
}
