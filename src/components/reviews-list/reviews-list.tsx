import classNames from 'classnames'

import { Review } from '@/components/review'
import { Button } from '@/components/ui/button'

import { useBooleanState } from '@/hooks/use-boolean-state'

import { IComment } from '@/types/books'

import Chevron from './assets/chevron-down.svg'

import styles from './reviews-list.module.scss'

type ReviewListProps = {
  reviews: IComment[]
}

export const ReviewsList = ({ reviews }: ReviewListProps) => {
  const { state: shouldShowReviews, toggle } = useBooleanState()

  return (
    <div className={styles.reviews}>
      <h3 className={classNames(styles.subTitle, shouldShowReviews && styles.withUnderline)}>
        <span className={styles.subTitleName}>Отзывы</span>
        <span className={styles.amountReviews}>{reviews?.length}</span>
        <button
          className={classNames(styles.chevronBtn, shouldShowReviews && styles.active)}
          onClick={toggle}
          type='button'
          data-test-id='button-hide-reviews'
        >
          <div className={styles.chevron}>
            <img src={Chevron} alt='chevron' />
          </div>
        </button>
      </h3>

      <ul className={classNames(styles.reviewsList, shouldShowReviews && styles.active)}>
        {reviews && reviews.map(review => <Review key={review.id} {...review} />)}
      </ul>

      <div className={styles.btnWrapper}>
        <Button
          type='button'
          size='large'
          name='Оценить книгу'
          clickHandler={() => {}}
          variant='primary'
          dataTestId='button-rating'
        />
      </div>
    </div>
  )
}
