import { Link, useParams } from 'react-router-dom'

import { useAppSelector } from '../../hooks/use-redux'
import { bookDetailedSelector } from '../../store/book-detailed/book-detailed.selector'
import { booksSelector } from '../../store/books/books.selector'
import { AllBooks, DataTestId } from '../../types/other'

import styles from './breadcrumbs.module.scss'

export const Breadcrumbs = () => {
  const { bookId, category } = useParams()
  const { book } = useAppSelector(bookDetailedSelector)
  const { categories } = useAppSelector(booksSelector)
  const categoryName = categories?.find(({ path }) => path === category)?.name

  return (
    <div className={styles.breadcrumbs}>
      <Link
        to={`/books/${categoryName ? category : AllBooks.path}`}
        data-test-id={DataTestId.BreadcrumbsLink}
      >
        <span>{categoryName ? categoryName : AllBooks.name}</span>
      </Link>
      <span>/</span>
      <Link to={`/books/${category}/${bookId}`}>
        <span data-test-id={DataTestId.BookName}>{book?.title}</span>
      </Link>
    </div>
  )
}
