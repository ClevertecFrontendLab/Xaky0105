import { Link, useParams } from 'react-router-dom'

import { useAppSelector } from '../../hooks/use-redux'
import { bookDetailedSelector } from '../../store/book-detailed/book-detailed.selector'
import { booksSelector } from '../../store/books/books.selector'
import { AllBooks } from '../../types/other'

import styles from './breadcrumbs.module.scss'

export const Breadcrumbs = () => {
  const { bookId, category } = useParams()
  const { book } = useAppSelector(bookDetailedSelector)
  const { categories } = useAppSelector(booksSelector)
  const categoryName = categories?.find(({ path }) => path === category)?.name

  return (
    <div className={styles.breadcrumbs}>
      <Link to={`/books/${categoryName ? category : AllBooks.path}`}>
        {categoryName ? categoryName : AllBooks.name}
      </Link>
      <span>/</span>
      <Link to={`/books/${category}/${bookId}`}>{book?.title}</Link>
    </div>
  )
}
