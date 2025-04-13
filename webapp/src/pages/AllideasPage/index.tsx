import { getViewIdeaRoute } from "../../lib/routes"
import { trpc } from "../../lib/trpc"
import { Link } from "react-router"
import scss from "./index.module.scss"
import { Segement } from "../../components/Segment"
export function Allidea() {
  const { data, error, isLoading, isFetching, isError } =
    trpc.getData.useQuery()

  if (isLoading || isFetching) {
    return <span>App is loading!</span>
  }
  if (isError) {
    return <span>Error!!!{error.message}</span>
  }
  return (
    <Segement title="All Ideas" >
      <div className={scss.ideas}>
        {data?.ideas.map(item => (
          <div key={`${item.name}-${item.id}`} className={scss.idea}>
            <Segement
              size={2}
              title={<Link
                  className={scss.ideaLink}
                  to={getViewIdeaRoute({ id: item.id })}
                >
                  {item.name}
                </Link>}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </Segement>
  )
}
