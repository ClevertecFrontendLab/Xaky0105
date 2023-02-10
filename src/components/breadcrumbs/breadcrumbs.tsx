import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import styles from './breadcrumbs.module.scss'

type BreadcrumbsParams = {
  bookId: string
  category: string
}

export const Breadcrumbs: FC = () => {
  const { bookId, category } = useParams<keyof BreadcrumbsParams>() as BreadcrumbsParams

  return (
    <div className={styles.breadcrumbs}>
      <Link to={`/books/${category}`}>{category}</Link>
      <Link to={`/books/${category}/${bookId}`}>
        {bookId} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aut consequatur
        vel, explicabo quia tempore! Dignissimos deleniti molestias voluptas sequi, vero nobis, cum
        eos incidunt quae doloribus natus provident ipsam!
      </Link>
    </div>
  )
}
