import { createElement } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { type IconBaseProps } from "react-icons/lib";


const icons = {
    likeEmpty: FaRegHeart,
    likeFill: FaHeart,
}
// keyof - один из ключей объекта
export const Icon = ({name, ...restProps}: {name: keyof typeof icons} & IconBaseProps)=>{
return createElement(icons[name], restProps)
}
