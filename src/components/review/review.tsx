import { FC } from 'react'

import { IReview } from '@/types/books'

import { Rating } from '../ui/rating'

import styles from './review.module.scss'

export const Review: FC<IReview> = ({ text, userName, avatar, rating, date }) => (
  <li className={styles.review}>
    <div className={styles.userData}>
      <div className={styles.imgWrapper}>
        <img src={avatar} alt='avatar' />
      </div>
      <div className={styles.userDateBlock}>
        <span>{userName}</span>
        <span>{date}</span>
      </div>
    </div>
    <Rating value={rating} />
    <p className={styles.userText}>{text}</p>
  </li>
)
