import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Breadcrumbs } from '../../components/breadcrumbs'
import { Container } from '../../components/container'
import { Loader } from '../../components/loader'
import { OverlayWithPortal } from '../../components/overlay-with-portal'
import { ReviewsList } from '../../components/reviews-list'
import { Toast } from '../../components/ui/toast'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { selectBookDetailed } from '../../store/book-detailed/book-detailed.selector'
import {
  getBookDetailedFailure,
  getBookDetailedFetch,
} from '../../store/book-detailed/book-detailed.slice'

import { DetailedInformation } from './detailed-information'
import { MainInfo } from './main-info'
import { RatingBlock } from './rating-block'

import styles from './book-page.module.scss'

export const BookPage = () => {
  const { bookId } = useParams()

  const dispatch = useAppDispatch()

  const { book, error, isLoading } = useAppSelector(selectBookDetailed)

  useEffect(() => {
    if (bookId) {
      dispatch(getBookDetailedFetch(bookId))
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
        <Toast
          type='negative'
          onClose={() => dispatch(getBookDetailedFailure(null))}
          message={error}
        />
      )}
      {isLoading && (
        <OverlayWithPortal>
          <Loader />
        </OverlayWithPortal>
      )}
    </section>
  )
}
