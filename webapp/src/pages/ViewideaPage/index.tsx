import { useParams } from "react-router"
import { editIdeaRoute, viewTypeParams } from "../../lib/routes"
import { trpc } from "../../lib/trpc"
import scss from "./index.module.scss"
import { Segment } from "../../components/Segment"
import {format} from 'date-fns'
import { LinkBtn } from "../../components/Button"


export const Viewidea = () => {
  const { ideaNick } = useParams() as viewTypeParams
  const getIdeaResult = trpc.getIdea.useQuery({ ideaNick })
  const getMeResult = trpc.getMe.useQuery()      


  
  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>
  }

  const idea = getIdeaResult.data.idea
  const me = getMeResult.data.me
  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={scss.createdAt}>Created at: {format(idea.createdAt, 'yyyy-MM-dd')}</div>
     <div className={scss.author}>Author: {idea.author.nick}</div>
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
}
