import { useParams } from "react-router"
import { editIdeaRoute, ViewTypeParams } from "../../../lib/routes"
import { canBlockIdea } from "../../../../../backend/src/utils/can"
import scss from "./index.module.scss"
import { Segment } from "../../../components/Segment"
import { format } from "date-fns"
import { Button, LikeBtn, LinkBtn } from "../../../components/Button"

import { trpc } from "../../../lib/trpc"
import { withPageWrapper } from "../../../lib/pageWrapper"
import { TrpcRouteOutput } from "@app/backend/src/router"
import { useForm } from "../../../lib/form"
import { FormItems } from "../../../components/FormItems"
import { Alert } from "../../../components/Alert"
import { useEffect } from "react"




export const Viewidea = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewTypeParams
    return trpc.getIdea.useQuery({
      ideaNick,
    })
  },
  showLoaderOnFetching: false,
  setProps: ({ queryResult, ctx, checkExist }) => ({
    idea: checkExist(queryResult.data.idea, "Idea not found"),
    me: ctx.me,
  }),
})(({ idea, me }) => {
    useEffect(() => {
    document.title = `Idea ${idea.name}`
  }, [])
  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={scss.createdAt}>
        Created at: {format(idea.createdAt, "yyyy-MM-dd")}
      </div>
      <div className={scss.author}>
        <p>Author: {idea.author.nick}</p>
        <p>{idea.author.name ? `(${idea.author.name})` : ""}</p>
      </div>
      <div
        className={scss.text}
        dangerouslySetInnerHTML={{ __html: idea.text }}
      />
      <div className={scss.likes}>
        Likes: {idea.totalLikes}
        {me && (
          <>
            <br />
            <LikeBtn idea={idea} />
          </>
        )}
      </div>
      {me?.id === idea.authorId && (
        <div className={scss.editButton}>
          <LinkBtn to={editIdeaRoute({ ideaNick: idea.nick })}>
            Edit Idea
          </LinkBtn>
        </div>
      )}
      {canBlockIdea(me) && (
        <div className={scss.blockIdea}>
          <BlockIdea idea={idea} />
        </div>
      )}
    </Segment>
  )
})

const BlockIdea = ({
  idea,
}: {
  idea: NonNullable<TrpcRouteOutput["getIdea"]["idea"]>
}) => {
  const blockIdea = trpc.blockIdea.useMutation()
  const trpcUtils = trpc.useUtils()
  const { formik, alertProps, btnProps } = useForm({
    onSubmit: async () => {
      await blockIdea.mutateAsync({ ideaId: idea.id })
      await trpcUtils.getIdea.refetch({ ideaNick: idea.nick })
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Alert {...alertProps} />
        <Button color="red" {...btnProps}>
          Block Idea
        </Button>
      </FormItems>
    </form>
  )
}
