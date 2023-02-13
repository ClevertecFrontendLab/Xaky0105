import { Rating } from '../../../components/ui/rating'

import styles from './rating-block.module.scss'

export const RatingBlock = ({ rating }: { rating: number | null }) => (
  <div className={styles.ratingBlock}>
    <h3 className={styles.subTitle}>Рейтинг</h3>
    <div className={styles.ratingWrap}>
      <Rating value={rating ? Math.round(rating) : 0} size='large' />
      {rating ? <span>{rating}</span> : <span className={styles.dontRating}>еще нет оценок</span>}
    </div>
  </div>
)
