import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Breadcrumbs } from '../../components/breadcrumbs'
import { Container } from '../../components/container'
import { Loader } from '../../components/loader'
import { OverlayWithPortal } from '../../components/overlay-with-portal'
import { ReviewsList } from '../../components/reviews-list'
import { Toast } from '../../components/ui/toast'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { bookDetailedSelector } from '../../store/book-detailed/book-detailed.selector'
import {
  getBookDetailedFailure,
  getBookDetailedRequest,
} from '../../store/book-detailed/book-detailed.slice'
import { ToastVariant } from '../../types/other'

import { DetailedInformation } from './detailed-information'
import { MainInfo } from './main-info'
import { RatingBlock } from './rating-block'

import styles from './book-page.module.scss'

export const BookPage = () => {
  const { bookId } = useParams()

  const dispatch = useAppDispatch()

  const { book, error, isLoading } = useAppSelector(bookDetailedSelector)

  useEffect(() => {
    if (bookId) {
      dispatch(getBookDetailedRequest(bookId))
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
          type={ToastVariant.negative}
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
