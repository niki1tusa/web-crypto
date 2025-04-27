import { getViewIdeaRoute } from "../../../lib/routes"
import { trpc } from "../../../lib/trpc"
import { Link } from "react-router"
import scss from "./index.module.scss"
import { Segment } from "../../../components/Segment"
import { Alert } from "../../../components/Alert"
import InfiniteScroll from "react-infinite-scroller"
import { layoutContentRef } from "../../../components/Layout"
import { Loader } from "../../../components/Loader"
import { useForm } from "../../../lib/form"
import { zGetIdeasTrpcInput } from "@app/backend/src/router/ideas/getIdeas/input"
import { Input } from "../../../components/Input"
import { HighlightText } from "../../../components/HighlightText"
import { useDebounce } from "../../../lib/useDebounce"
import { withPageWrapper } from "../../../lib/pageWrapper"
import { useEffect } from "react"

export const AllideasPage = withPageWrapper({
})(() => {
  useEffect(() => {
    document.title = "All Ideas"
  }, [])

  const { formik } = useForm({
    initialValues: { search: "" },
    validationSchema: zGetIdeasTrpcInput.pick({ search: true }),
  })

  const debouncedSearch = useDebounce({
    value: formik.values.search,
    time: 400,
  })

  const {
    data,
    error,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = trpc.getIdeas.useInfiniteQuery(
    {
      search: debouncedSearch,
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.nextCursor
      },
    },
  )
  return (
    <Segment title="All Ideas">
      <div className={scss.filter}>
        <Input maxWidth={"100%"} label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="page" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].ideas.length ? (
        <Alert color="brown">Nothing found by search</Alert>
      ) : (
        <div className={scss.ideas}>
          <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage()
              }
            }}
            hasMore={hasNextPage}
            loader={
              <div className={scss.more} key="loader">
                <Loader type="section" />
              </div>
            }
            getScrollParent={() => layoutContentRef.current}
            useWindow={
              layoutContentRef.current &&
              getComputedStyle(layoutContentRef.current).overflow !== "auto"
            }
          >
            {data.pages
              .flatMap(page => page.ideas)
              .map(item => (
                <div key={`${item.name}-${item.id}`} className={scss.idea}>
                  <Segment
                    size={2}
                    title={
                      <Link
                        className={scss.ideaLink}
                        to={getViewIdeaRoute({ ideaNick: item.nick })}
                      >
                        <HighlightText
                          text={item.nick}
                          highlight={formik.values.search || ""}
                        />
                      </Link>
                    }
                    description={item.description}
                  />
                  <div className="flex gap-1">Likes: {item.totalLikes}</div>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  )
})
