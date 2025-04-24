import { getViewIdeaRoute } from "../../../lib/routes"
import { trpc } from "../../../lib/trpc"
import { Link } from "react-router"
import scss from "./index.module.scss"
import { Segment } from "../../../components/Segment"
import { Alert } from "../../../components/Alert"
export function Allidea() {
  const { data, error, isLoading, isFetching, isError,  hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching} =
    trpc.getIdeas.useInfiniteQuery({
      limit: 2
    },
  {
    getNextPageParam: (lastPage)=>{
      return lastPage.nextCursor
    }
  }
  )
console.log(data);


  return (
    <Segment title="All Ideas">
      {isLoading || isRefetching? (
        <div>Loading...</div>
      ): isError?(
        <Alert color='red'>{error.message}</Alert>
      ):
      
     ( <div className={scss.ideas}>
        {data.pages.flatMap((page)=>page.ideas).map((item)=> (
          <div key={`${item.name}-${item.id}`} className={scss.idea}>
            <Segment
              size={2}
              title={
                <Link
                  className={scss.ideaLink}
                  to={getViewIdeaRoute({ ideaNick: item.nick })}
                >
                  {item.nick}
                </Link>
              }
              description={item.description}
            />
          </div>
        ))}
        <div className={scss.more}>
          {hasNextPage && !isFetchingNextPage && (
            <button onClick={()=>{
              void fetchNextPage()
            }}>
              Load more 
            </button>
          )}
        </div>
      </div>)}
    </Segment>
  )
}
