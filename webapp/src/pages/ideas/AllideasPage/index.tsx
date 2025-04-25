import { getViewIdeaRoute } from "../../../lib/routes"
import { trpc } from "../../../lib/trpc"
import { Link } from "react-router"
import scss from "./index.module.scss"
import { Segment } from "../../../components/Segment"
import { Alert } from "../../../components/Alert"
import InfiniteScroll from "react-infinite-scroller"
import { layoutContentRef } from "../../../components/Layout"
import { Loader } from "../../../components/Loader"
export function AllideasPage() {
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
  return (
    <Segment title="All Ideas">
      {isLoading || isRefetching? (
       <Loader type="page"/>
      ): isError?(
        <Alert color='red'>{error.message}</Alert>
      ):

     ( <div className={scss.ideas}>      
     <InfiniteScroll threshold={250} loadMore={()=>{
      if(!isFetchingNextPage && hasNextPage){
        void fetchNextPage()
      }
     }}
     hasMore={hasNextPage}
     loader={
      <div className={scss.more} key="loader"><Loader type="section"/></div>
     }
     getScrollParent={()=> layoutContentRef.current}
     useWindow={(layoutContentRef.current && getComputedStyle(layoutContentRef.current).overflow !== 'auto')}
     >
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
  </InfiniteScroll>
      </div>)}
    </Segment>
  )
}
