import { FC } from 'react'
import classNames from 'classnames'

import { ReactComponent as RatingIcon } from '@/assets/images/rating/rating.svg'
import { ReactComponent as RatingIconEmpty } from '@/assets/images/rating/rating-empty.svg'

import styles from './rating.module.scss'

interface IRating {
  value: number
  size?: 'medium' | 'large'
}

export const Rating: FC<IRating> = ({ value, size = 'medium' }) => {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className={styles.rating}>
      {stars.map(star => (
        <div className={classNames(styles.ratingItem, size === 'large' && styles.large)} key={star}>
          {value < star ? <RatingIconEmpty /> : <RatingIcon />}
        </div>
      ))}
    </div>
  )
}
