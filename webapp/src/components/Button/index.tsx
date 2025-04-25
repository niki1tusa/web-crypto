import { Link } from 'react-router';
import styles from './index.module.scss'
import cn from 'classnames'


export type BtnProps = { children: React.ReactNode; loading?: boolean }
export const Button = ({children, loading = true}: BtnProps) => {
  return (
    <button className={cn({[styles.button]: true, [styles.disabled]: loading, [styles.loading]: loading})} type="submit" disabled={loading}>
<span className={styles.text}>{children}</span>
    </button>
  )
}

export const LinkBtn = ({children, to}: {children: React.ReactNode; to: string}) => { 
  return(
<Link className={styles.button} to={to}>
    {children}
</Link>
  )
}
