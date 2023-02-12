import { CommentType } from '@/types/books'

import { formatDate } from '@/utils/date'

import { BASE_URL } from '@/api/api'

import { Rating } from '../ui/rating'

import userAvatar from './assets/user-review.png'

import styles from './review.module.scss'

export const Review = ({ text, user, rating, createdAt }: CommentType) => (
  <li className={styles.review}>
    <div className={styles.userData}>
      <div className={styles.imgWrapper}>
        <img src={user.avatarUrl ? `${BASE_URL}${user.avatarUrl}` : userAvatar} alt='avatar' />
      </div>
      <div className={styles.userDateBlock}>
        <span>
          {user.firstName} {user.lastName}
        </span>
        <span>{formatDate(createdAt)}</span>
      </div>
    </div>
    <Rating value={rating ? rating : 0} />
    <p className={styles.userText}>{text}</p>
  </li>
)
