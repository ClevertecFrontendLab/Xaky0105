import { Rating } from '@/components/ui/rating'
import { SubTitle } from '@/components/ui/sub-title'

import styles from './rating-block.module.scss'

export const RatingBlock = ({ rating }: { rating: number }) => (
  <div className={styles.ratingBlock}>
    <SubTitle text='Рейтинг' />
    <div className={styles.ratingWrap}>
      <Rating value={Math.round(rating)} size='large' />
      <span>{rating}</span>
    </div>
  </div>
)
