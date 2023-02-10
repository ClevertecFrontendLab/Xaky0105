import { FC, Fragment, memo } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import { HightLight } from '@/components/hight-light'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/ui/rating'

import { ICardData } from '@/types/books'
import { TypeSortMainPage } from '@/types/other'

import styles from './card.module.scss'

interface ICardProps {
  cardData: ICardData
  selectSorting: TypeSortMainPage
  inputText: string
}

export const Card: FC<ICardProps> = memo(
  ({
    selectSorting,
    inputText,
    cardData: { name, images, rating, authors, year, id, isBusy, booked, category },
  }) => {
    const buttonMessage = () => {
      if (isBusy) {
        return 'Занята до 03.05'
      }
      if (booked) {
        return 'Забронирована'
      }

      return 'Забронировать'
    }

    return (
      <li key={id} data-test-id='card'>
        <Link
          className={clsx(
            styles.card,
            selectSorting === 'tile' && styles.cardTile,
            selectSorting === 'list' && styles.cardList
          )}
          to={`/books/${category}/${id}`}
        >
          <div className={clsx(styles.imageWrapper, !images.length && styles.notFoundImage)}>
            {images.length > 0 && <img src={images[0]} alt={name} />}
          </div>
          <div className={styles.cardContent}>
            <div className={styles.nameWrap}>
              <HightLight classNameHL={styles.name} searchWord={inputText} text={name} />
            </div>
            <p className={styles.author}>
              {authors.map(author => (
                <Fragment key={author}>{author}, </Fragment>
              ))}
              {year}
            </p>
            {rating ? (
              <div className={styles.ratingWrap}>
                <Rating value={rating} />
              </div>
            ) : (
              <p className={styles.dontRating}>еще нет оценок</p>
            )}
            <div className={styles.btnWrap}>
              <Button
                name={buttonMessage()}
                type='button'
                clickHandler={() => {}}
                isDisabled={isBusy}
                variant={booked ? 'secondary' : 'primary'}
              />
            </div>
          </div>
        </Link>
      </li>
    )
  }
)
