import { FC } from 'react'

import { Rating } from '@/components/ui/rating'
import { SubTitle } from '@/components/ui/sub-title'

import styles from './rating-block.module.scss'

export const RatingBlock: FC = () => (
  <div className={styles.ratingBlock}>
    <SubTitle text='Рейтинг' />
    <div className={styles.ratingWrap}>
      <Rating value={4} size='large' />
      <span>4.3</span>
    </div>
  </div>
)
