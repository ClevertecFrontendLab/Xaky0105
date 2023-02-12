import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

import { Review } from '@/components/review'
import { Button } from '@/components/ui/button'

import { useBooleanState } from '@/hooks/use-boolean-state'

import { IComment } from '@/types/books'

import Chevron from './assets/chevron-down.svg'

import styles from './reviews-list.module.scss'

interface IReviewList {
  reviews: IComment[]
}

export const ReviewsList = ({ reviews }: IReviewList) => {
  const { state: shouldShowReviews, toggle } = useBooleanState()

  const ref = useRef<HTMLUListElement>(null)

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
      <CSSTransition
        in={shouldShowReviews}
        nodeRef={ref}
        timeout={200}
        classNames={{
          enterActive: styles.enterActive,
          enterDone: styles.enter,
          exitActive: styles.exitActive,
          exitDone: styles.exit,
        }}
        unmountOnExit={true}
      >
        <ul className={styles.reviewsList} ref={ref}>
          {reviews && reviews.map(review => <Review key={review.id} {...review} />)}
        </ul>
      </CSSTransition>

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
