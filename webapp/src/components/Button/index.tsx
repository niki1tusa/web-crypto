import { Link } from "react-router"
import styles from "./index.module.scss"
import cn from "classnames"
import { TrpcRouteOutput } from "@app/backend/src/router"
import { trpc } from "../../lib/trpc"

export const LikeBtn = ({
  idea,
}: {
  idea: NonNullable<TrpcRouteOutput["getIdea"]["idea"]>
}) => {
  const trpcUtils = trpc.useUtils()
  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData({ ideaNick: idea.nick })
      if (oldGetIdeaData?.idea) {
        const newGetIdeaData = {
          ...oldGetIdeaData,
          idea: {
            ...oldGetIdeaData.idea,
            isLikedByMe,
            totalLikes: oldGetIdeaData.idea.totalLikes + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getIdea.setData({ ideaNick: idea.nick }, newGetIdeaData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getIdea.invalidate({ ideaNick: idea.nick })
    },
  })
  return (
    <button
      className={styles.likeButton}
      onClick={() => {
        void setIdeaLike.mutateAsync({
          ideaId: idea.id,
          isLikedByMe: !idea.isLikedByMe,
        })
      }}
    >
      {idea.isLikedByMe ? "Unlike" : "Like"}
    </button>
  )
}

type BtnColor = "red" | "green"
export type BtnProps = {
  children: React.ReactNode
  loading?: boolean
  color?: BtnColor
}

export const Button = ({
  children,
  loading = true,
  color = "green",
}: BtnProps) => {
  return (
    <button
      className={cn({
        [styles.button]: true,
        [styles.disabled]: loading,
        [styles.loading]: loading,
        [styles[`color-${color}`]]: true
      })}
      type="submit"
      disabled={loading}
    >
      <span className={styles.text}>{children}</span>
    </button>
  )
}

export const LinkBtn = ({
  children,
  to,
  color = 'green'
}: {
  children: React.ReactNode
  to: string
  color?: BtnColor
}) => {
  return (
    <Link className={cn({[styles.button]: true, [styles[`color-${color}`]]: true})} to={to}>
      {children}
    </Link>
  )
}
