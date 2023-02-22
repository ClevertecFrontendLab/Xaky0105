import classNames from 'classnames'

import { useBooleanState } from '../../hooks/use-boolean-state'
import { CommentType } from '../../types/books'
import { BtnType, BtnVariant, DataTestId, Size } from '../../types/other'
import { Review } from '../review/review'
import { Button } from '../ui/button'

import Chevron from './assets/chevron-down.svg'

import styles from './reviews-list.module.scss'

type ReviewListProps = {
  reviews: CommentType[] | null
}

export const ReviewsList = ({ reviews }: ReviewListProps) => {
  const { state: shouldShowReviews, toggle } = useBooleanState()

  return (
    <div className={styles.reviews}>
      <h3 className={classNames(styles.subTitle, { [styles.withUnderline]: shouldShowReviews })}>
        <span className={styles.subTitleName}>Отзывы</span>
        <span className={styles.amountReviews}>{reviews?.length}</span>
        <button
          className={classNames(styles.chevronBtn, { [styles.active]: shouldShowReviews })}
          onClick={toggle}
          type='button'
          data-test-id={DataTestId.ButtonHideReviews}
        >
          <div className={styles.chevron}>
            <img src={Chevron} alt='chevron' />
          </div>
        </button>
      </h3>

      <ul className={classNames(styles.reviewsList, { [styles.active]: shouldShowReviews })}>
        {reviews && reviews.map(review => <Review key={review.id} {...review} />)}
      </ul>

      <div className={styles.btnWrapper}>
        <Button
          type={BtnType.button}
          size={Size.large}
          name='Оценить книгу'
          clickHandler={() => {}}
          variant={BtnVariant.primary}
          dataTestId={DataTestId.ButtonRating}
        />
      </div>
    </div>
  )
}
