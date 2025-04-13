import { useParams } from "react-router"
import { viewTypeParams } from "../../lib/routes"
import { trpc } from "../../lib/trpc"


const Viewidea = () => {
  const { id }= useParams() as viewTypeParams
  
    const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({id})

    if (isLoading || isFetching) {
      return <span>App is loading!</span>
    }
    if (isError) {
      return <span>Error!!!{error.message}</span>
    } 
    if(!data.idea){
      return <span>idea not found</span>
    }
  return (
    <div>
        <h1>{data.idea.name} {id}</h1>
       <p>{data.idea.description}.</p>
<div dangerouslySetInnerHTML={{__html: data.idea.text}}/>
        </div>
  )
}

export default Viewidea