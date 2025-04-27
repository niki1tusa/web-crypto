import { ErrorPageComponent } from "../../../components/ErrorPageCompnent"
import img404 from "../../../assets/images/404.png"
import styles from './index.module.scss'
export const NotFoundPage = ({
  title = "Not Found",
  message = "This page does not exist",
}: {
  title?: string
  message?: string
}) => {
  return (
    <ErrorPageComponent title={title} message={message}>
      <img src={img404} alt="404" width="800" height="600" className={styles.image}/>
    </ErrorPageComponent>
  )
}
