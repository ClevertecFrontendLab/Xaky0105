import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import styles from './breadcrumbs.module.scss'

type BreadcrumbsParams = {
  bookId: string
  category: string
}

interface IBreadcrumbs {
  title: string
  categoryName: string
}

export const Breadcrumbs: FC<IBreadcrumbs> = ({ categoryName, title }) => {
  const { bookId, category } = useParams<keyof BreadcrumbsParams>() as BreadcrumbsParams

  return (
    <div className={styles.breadcrumbs}>
      <Link to={`/books/${category}`}>{categoryName}</Link>
      <Link to={`/books/${category}/${bookId}`}>{title}</Link>
    </div>
  )
}
