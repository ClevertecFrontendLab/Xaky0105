import { Link, useParams } from 'react-router-dom'

import { selectBookDetailed } from '@/store/book/book.selector'
import { selectCategories } from '@/store/categories/categories.selector'

import { useAppSelector } from '@/hooks/use-redux'

import styles from './breadcrumbs.module.scss'

export const Breadcrumbs = () => {
  const { bookId } = useParams()
  const { book } = useAppSelector(selectBookDetailed)
  const { currentCategory } = useAppSelector(selectCategories)

  return (
    <div className={styles.breadcrumbs}>
      <Link to={`/books/${currentCategory?.path}`}>{currentCategory?.name}</Link>
      <Link to={`/books/${currentCategory?.path}/${bookId}`}>{book?.title}</Link>
    </div>
  )
}
