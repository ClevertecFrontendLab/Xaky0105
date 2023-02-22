import { Fragment, memo } from 'react'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

import { BASE_URL } from '../../api/api'
import { BookType } from '../../types/books'
import { BtnType, BtnVariant, DataTestId, TypeSortMainPage } from '../../types/other'
import { buttonBookingMessage } from '../../utils/buttons'
import { HightLight } from '../hight-light'
import { Button } from '../ui/button'
import { Rating } from '../ui/rating'

import styles from './card.module.scss'

type CardProps = {
  cardData: BookType
  selectSorting: TypeSortMainPage
  inputText: string
}

export const Card = memo(
  ({
    selectSorting,
    inputText,
    cardData: { title, image, rating, authors, issueYear, id, booking },
  }: CardProps) => {
    const { category } = useParams()

    return (
      <li key={id} data-test-id={DataTestId.Card}>
        <Link
          className={classNames(styles.card, {
            [styles.cardTile]: selectSorting === TypeSortMainPage.tile,
            [styles.cardList]: selectSorting === TypeSortMainPage.list,
          })}
          to={`/books/${category}/${id}`}
        >
          <div className={classNames(styles.imageWrapper, { [styles.notFoundImage]: !image })}>
            {image && <img src={`${BASE_URL}${image.url}`} alt={title} />}
          </div>
          <div className={styles.cardContent}>
            <div className={styles.nameWrap}>
              <HightLight classNameHL={styles.name} searchWord={inputText} text={title} />
            </div>
            <p className={styles.author}>
              {authors && authors.map(author => <Fragment key={author}>{author}, </Fragment>)}
              {issueYear}
            </p>
            {rating ? (
              <div className={styles.ratingWrap}>
                <Rating value={Math.round(rating)} />
              </div>
            ) : (
              <p className={styles.dontRating}>еще нет оценок</p>
            )}
            <div className={styles.btnWrap}>
              <Button
                name={buttonBookingMessage(booking)}
                type={BtnType.button}
                clickHandler={() => {}}
                isDisabled={!!booking}
                variant={booking ? BtnVariant.secondary : BtnVariant.primary}
              />
            </div>
          </div>
        </Link>
      </li>
    )
  }
)
