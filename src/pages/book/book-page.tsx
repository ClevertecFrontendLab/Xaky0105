import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Container } from '@/components/container'
import { ReviewsList } from '@/components/reviews-list'

import { ICardData } from '@/types/books'

import { getBookById } from '@/utils/books'

import { DetailedInformation } from './detailed-information'
import { MainInfo } from './main-info'
import { RatingBlock } from './rating-block'

import styles from './book-page.module.scss'

type BookParams = {
  bookId: string
}

export const BookPage: FC = () => {
  const { bookId } = useParams<keyof BookParams>() as BookParams
  const book = getBookById(bookId) as ICardData

  return (
    <section className={styles.bookPage}>
      <div className={styles.breadcrumbsWrap}>
        <Container>
          <Breadcrumbs />
        </Container>
      </div>
      <Container>
        <MainInfo book={book} />
        <RatingBlock />
        <DetailedInformation />
        <ReviewsList reviews={book.reviews} />
      </Container>
    </section>
  )
}
