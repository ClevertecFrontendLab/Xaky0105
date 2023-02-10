import { FC, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'

import { Review } from '@/components/review'
import { Button } from '@/components/ui/button'

import { useBooleanState } from '@/hooks/use-boolean-state'
import { useWindowSize } from '@/hooks/use-window-size'

import { IReview } from '@/types/books'

import { ReactComponent as Chevron } from '@/assets/images/chevrons/chevron-down.svg'

import styles from './reviews-list.module.scss'

interface IReviewList {
  reviews: IReview[]
}

export const ReviewsList: FC<IReviewList> = ({ reviews }) => {
  const { state: shouldShowReviews, toggle } = useBooleanState()
  const { x: windowWidth } = useWindowSize()

  const ref = useRef<HTMLUListElement>(null)

  return (
    <div className={styles.reviews}>
      <h3 className={clsx(styles.subTitle, shouldShowReviews && styles.withUnderline)}>
        <span className={styles.subTitleName}>Отзывы</span>
        <span className={styles.amountReviews}>{reviews.length}</span>
        <button
          className={clsx(styles.chevronBtn, shouldShowReviews && styles.active)}
          onClick={toggle}
          type='button'
          data-test-id='button-hide-reviews'
        >
          <Chevron className={styles.chevron} />
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
          {reviews.map(review => (
            <Review key={review.id} {...review} />
          ))}
        </ul>
      </CSSTransition>

      <div className={styles.btnWrapper}>
        <Button
          type='button'
          size={windowWidth > 500 ? 'large' : 'small'}
          name='Оценить книгу'
          clickHandler={() => {}}
          variant='primary'
          dataTestId='button-rating'
        />
      </div>
    </div>
  )
}
