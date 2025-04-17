import styles from './index.module.scss'
import cn from 'classnames'
export const Button = ({children, loading = false}: {children: React.ReactNode; loading?: boolean}) => {
  return (
    <button className={cn({[styles.button]: true, [styles.disabled]: loading})} type="submit" disabled={loading}>
{loading? 'Submiting...' :children}
    </button>
  )
}
