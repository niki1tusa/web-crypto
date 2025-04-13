import styles from "./index.module.scss"
export const Segement = ({
  title,
  size = 1,
  description,
  children,
}: {
  title: React.ReactNode
  size?: 1 | 2
  description?: string
  children?: React.ReactNode
}) => {
  return (
    <div className={styles.segment}>
      {size === 1 ? (
        <h1 className={styles.title}>{title}</h1>
      ) : (
        <h2 className={styles.title}>{title}</h2>
      )}
      {description && <p className={styles.description}>{description}</p>}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  )
}
