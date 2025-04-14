import { useParams } from "react-router"
import { viewTypeParams } from "../../lib/routes"
import { trpc } from "../../lib/trpc"
import scss from "./index.module.scss"
import { Segment } from "../../components/Segment"

export const Viewidea = () => {
  const { id } = useParams() as viewTypeParams

  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery(
    { id },
  )
  if (isLoading || isFetching) {
    return <span>App is loading!</span>
  }
  if (isError) {
    return <span>Error!!!{error.message}</span>
  }
  if (!data || !data.idea) {
    return <span>idea not found</span>
  }
  return (
    
<Segment title={data.idea.name} description={data.idea.description}>
      <div
        className={scss.text}
        dangerouslySetInnerHTML={{ __html: data.idea.text }}
      />
</Segment>


  )
}


