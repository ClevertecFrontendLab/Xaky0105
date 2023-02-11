import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Container } from '@/components/container'
import { Loader } from '@/components/loader'
import { OverlayWithPortal } from '@/components/overlay-with-portal'
import { ReviewsList } from '@/components/reviews-list'
import { Toast } from '@/components/ui/toast'

import {
  selectBookDetailed,
  selectErrorBook,
  selectIsLoadingBook,
} from '@/store/book/book.selector'
import { clearBook, getBookFailure, getBookFetch } from '@/store/book/book.slice'

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'

import { DetailedInformation } from './detailed-information'
import { MainInfo } from './main-info'
import { RatingBlock } from './rating-block'

import styles from './book-page.module.scss'

type BookParams = {
  bookId: string
}

export const BookPage: FC = () => {
  const { bookId } = useParams<keyof BookParams>() as BookParams

  const dispatch = useAppDispatch()

  const isLoadingBookDetailed = useAppSelector(selectIsLoadingBook)
  const bookDetailed = useAppSelector(selectBookDetailed)
  const bookError = useAppSelector(selectErrorBook)

  useEffect(() => {
    dispatch(getBookFetch(+bookId))

    return () => {
      dispatch(clearBook())
    }
  }, [dispatch, bookId])

  return (
    <section className={styles.bookPage}>
      {bookDetailed.id && (
        <>
          <div className={styles.breadcrumbsWrap}>
            <Container>
              <Breadcrumbs categoryName={bookDetailed.categories[0]} title={bookDetailed.title} />
            </Container>
          </div>
          <Container>
            <MainInfo book={bookDetailed} />
            <RatingBlock rating={bookDetailed.rating} />
            <DetailedInformation book={bookDetailed} />
            <ReviewsList reviews={bookDetailed.comments} />
          </Container>
        </>
      )}
      <OverlayWithPortal isOpened={isLoadingBookDetailed}>
        <Loader />
      </OverlayWithPortal>
      {bookError && (
        <Toast type='negative' onClose={() => dispatch(getBookFailure(''))} message={bookError} />
      )}
    </section>
  )
}
