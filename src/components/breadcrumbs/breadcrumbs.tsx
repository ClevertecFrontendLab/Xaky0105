import { Link, useParams } from 'react-router-dom'

import { selectBookDetailed } from '@/store/book/book.selector'
import { selectBookById } from '@/store/books/books.selector'
import { selectCategories } from '@/store/categories/categories.selector'

import { useAppSelector } from '@/hooks/use-redux'

import styles from './breadcrumbs.module.scss'

type BreadcrumbsParams = {
  bookId: string
  category: string
}

export const Breadcrumbs = () => {
  const { bookId, category } = useParams<keyof BreadcrumbsParams>() as BreadcrumbsParams
  const bookById = useAppSelector(selectBookById(+bookId))
  const bookDetailed = useAppSelector(selectBookDetailed)
  const categories = useAppSelector(selectCategories)

  const selectCategory = categories.find(categoryBook => categoryBook.path === category)?.name

  return (
    <div className={styles.breadcrumbs}>
      <Link to={`/books/${category}`}>{selectCategory ? selectCategory : 'Все книги'}</Link>
      <Link to={`/books/${category}/${bookId}`}>
        {bookDetailed.id ? bookDetailed.title : bookById?.title}
      </Link>
    </div>
  )
}
