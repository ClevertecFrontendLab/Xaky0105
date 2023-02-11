import { Rating } from '@/components/ui/rating'

import styles from './rating-block.module.scss'

export const RatingBlock = ({ rating }: { rating: number }) => (
  <div className={styles.ratingBlock}>
    <h3 className={styles.subTitle}>Рейтинг</h3>
    <div className={styles.ratingWrap}>
      <Rating value={Math.round(rating)} size='large' />
      <span>{rating}</span>
    </div>
  </div>
)
