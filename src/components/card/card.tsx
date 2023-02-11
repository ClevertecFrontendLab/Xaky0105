import { Fragment, memo } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { HightLight } from '@/components/hight-light'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/ui/rating'

import { selectCategoriesByName } from '@/store/categories/categories.selector'

import { useAppSelector } from '@/hooks/use-redux'

import { IBook } from '@/types/books'
import { TypeSortMainPage } from '@/types/other'

import { BASE_URL } from '@/api/api'

import styles from './card.module.scss'

interface ICardProps {
  cardData: IBook
  selectSorting: TypeSortMainPage
  inputText: string
}

export const Card = memo(
  ({
    selectSorting,
    inputText,
    cardData: { title, image, rating, authors, issueYear, id, booking, categories },
  }: ICardProps) => {
    const categoryByName = useAppSelector(selectCategoriesByName(categories[0]))

    const buttonMessage = () => {
      if (booking) {
        return 'Занята до 03.05'
      }

      return 'Забронировать'
    }

    return (
      <li key={id} data-test-id='card'>
        <Link
          className={classNames(
            styles.card,
            selectSorting === 'tile' && styles.cardTile,
            selectSorting === 'list' && styles.cardList
          )}
          to={`/books/${categoryByName.path}/${id}`}
        >
          <div className={classNames(styles.imageWrapper, !image && styles.notFoundImage)}>
            {image && <img src={`${BASE_URL}${image.url}`} alt={title} />}
          </div>
          <div className={styles.cardContent}>
            <div className={styles.nameWrap}>
              <HightLight classNameHL={styles.name} searchWord={inputText} text={title} />
            </div>
            <p className={styles.author}>
              {authors.map(author => (
                <Fragment key={author}>{author}, </Fragment>
              ))}
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
                name={buttonMessage()}
                type='button'
                clickHandler={() => {}}
                isDisabled={!!booking}
                variant={booking ? 'secondary' : 'primary'}
              />
            </div>
          </div>
        </Link>
      </li>
    )
  }
)
