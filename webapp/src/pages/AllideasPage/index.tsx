import { getViewIdeaRoute } from "../../lib/routes"
import { trpc } from "../../lib/trpc"
import { Link } from "react-router"
export function Allidea() {
  const { data, error, isLoading, isFetching, isError } = trpc.getData.useQuery()

  if (isLoading || isFetching) {
    return <span>App is loading!</span>
  }
  if (isError) {
    return <span>Error!!!{error.message}</span>
  }
  return (
    <div>
      <h1>All Ideas</h1>
      <div>
        {data?.ideas.map(item => (
          <div key={`${item.name}-${item.id}`}>
            <p><Link to={getViewIdeaRoute({id: item.id})}>{item.name}</Link></p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
