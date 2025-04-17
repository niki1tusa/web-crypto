import styles from './index.module.scss'
import cn from 'classnames'
export const Alert = ({color, children}:{color: 'red' | 'green'; children: React.ReactNode}) => {
  return (
    <div className={cn({[styles.alert]: true, [styles[color]]: true})}>
        {children}
    </div>
  )
}
