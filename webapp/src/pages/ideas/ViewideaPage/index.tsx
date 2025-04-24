import { useParams } from "react-router"
import { editIdeaRoute, ViewTypeParams } from "../../../lib/routes"

import scss from "./index.module.scss"
import { Segment } from "../../../components/Segment"
import {format} from 'date-fns'
import { LinkBtn } from "../../../components/Button"

import { trpc } from "../../../lib/trpc"
import { withPageWrapper } from "../../../lib/pageWrapper"


export const Viewidea = withPageWrapper({
useQuery: ()=>{
  const {ideaNick} = useParams() as ViewTypeParams
  return trpc.getIdea.useQuery({
    ideaNick
  })
},
setProps: ({queryResult, ctx, checkExist})=>({
  idea: checkExist(queryResult.data.idea, 'Idea not found'),
  me: ctx.me
})
})(({idea, me}) => {
  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={scss.createdAt}>Created at: {format(idea.createdAt, 'yyyy-MM-dd')}</div>
     <div className={scss.author}>
      <p>Author: {idea.author.nick}</p>
     <p>{idea.author.name? `(${idea.author.name})`: ''}</p> 

     </div>
      <div
        className={scss.text}
        dangerouslySetInnerHTML={{ __html: idea.text }}
      />
      {
        me?.id === idea.authorId && (
          <div className={scss.editButton}>
            <LinkBtn to={editIdeaRoute({ideaNick: idea.nick})}>Edit Idea</LinkBtn>
          </div>
        )
      }
    </Segment>
  )
})
