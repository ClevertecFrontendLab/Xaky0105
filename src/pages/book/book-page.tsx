import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Container } from '@/components/container'
import { ReviewsList } from '@/components/reviews-list'
import { Toast } from '@/components/ui/toast'

import { selectBookDetailed } from '@/store/book/book.selector'
import { getBookFailure, getBookFetch } from '@/store/book/book.slice'

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'

import { DetailedInformation } from './detailed-information'
import { MainInfo } from './main-info'
import { RatingBlock } from './rating-block'

import styles from './book-page.module.scss'

export const BookPage = () => {
  const { bookId } = useParams()

  const dispatch = useAppDispatch()

  const { book, error } = useAppSelector(selectBookDetailed)

  useEffect(() => {
    if (bookId) {
      dispatch(getBookFetch(bookId))
    }
  }, [dispatch, bookId])

  return (
    <section className={styles.bookPage}>
      <div className={styles.breadcrumbsWrap}>
        <Container>
          <Breadcrumbs />
        </Container>
      </div>
      {book && (
        <Container>
          <MainInfo book={book} />
          <RatingBlock rating={book.rating} />
          <DetailedInformation book={book} />
          <ReviewsList reviews={book.comments} />
        </Container>
      )}

      {error && (
        <Toast type='negative' onClose={() => dispatch(getBookFailure(''))} message={error} />
      )}
    </section>
  )
}
