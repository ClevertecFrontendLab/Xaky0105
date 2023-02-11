import { FC } from 'react'

import { Rating } from '@/components/ui/rating'
import { SubTitle } from '@/components/ui/sub-title'

import styles from './rating-block.module.scss'

export const RatingBlock: FC<{ rating: number }> = ({ rating }) => (
  <div className={styles.ratingBlock}>
    <SubTitle text='Рейтинг' />
    <div className={styles.ratingWrap}>
      <Rating value={Math.round(rating)} size='large' />
      <span>{rating}</span>
    </div>
  </div>
)
