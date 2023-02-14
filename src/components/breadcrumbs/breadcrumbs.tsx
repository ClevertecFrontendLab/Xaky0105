import { Link, useParams } from 'react-router-dom'

import { useAppSelector } from '../../hooks/use-redux'
import { bookDetailedSelector } from '../../store/book-detailed/book-detailed.selector'
import { booksSelector } from '../../store/books/books.selector'

import styles from './breadcrumbs.module.scss'

export const Breadcrumbs = () => {
  const { bookId } = useParams()
  const { book } = useAppSelector(bookDetailedSelector)
  const { currentCategory } = useAppSelector(booksSelector)

  return (
    <div className={styles.breadcrumbs}>
      <Link to={`/books/${currentCategory?.path}`}>{currentCategory?.name}</Link>
      <span>/</span>
      <Link to={`/books/${currentCategory?.path}/${bookId}`}>{book?.title}</Link>
    </div>
  )
}
