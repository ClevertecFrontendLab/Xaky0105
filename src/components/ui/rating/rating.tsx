import classNames from 'classnames'

import RatingIcon from './assets/rating.svg'
import RatingIconEmpty from './assets/rating-empty.svg'

import styles from './rating.module.scss'

type RatingProps = {
  value: number
  size?: 'medium' | 'large'
}

export const Rating = ({ value, size = 'medium' }: RatingProps) => {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className={styles.rating}>
      {stars.map(star => (
        <div className={classNames(styles.ratingItem, size === 'large' && styles.large)} key={star}>
          {value < star ? (
            <img src={RatingIconEmpty} alt='rating-empty' />
          ) : (
            <img src={RatingIcon} alt='rating' />
          )}
        </div>
      ))}
    </div>
  )
}
