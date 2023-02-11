import { FC } from 'react'
import clsx from 'clsx'

import { errorHandler } from '@/utils/errors'

import { ReactComponent as CloseIcon } from '@/assets/images/action/close.svg'
import { ReactComponent as PositiveIcon } from '@/assets/images/other/positive-circle.svg'
import { ReactComponent as NegativeIcon } from '@/assets/images/other/warning-circle.svg'

import styles from './toast.module.scss'

interface IToast {
  message: string
  type: 'positive' | 'negative'
  onClose: () => void
}

export const Toast: FC<IToast> = ({ message, type, onClose }) => (
  <div
    className={clsx(
      styles.toast,
      type === 'positive' && styles.positive,
      type === 'negative' && styles.negative
    )}
    data-test-id='error'
  >
    <div className={styles.message}>
      {type === 'positive' ? (
        <PositiveIcon className={styles.icon} />
      ) : (
        <NegativeIcon className={styles.icon} />
      )}
      <p>{errorHandler(message)}</p>
    </div>
    <CloseIcon className={styles.closeIcon} onClick={onClose} />
  </div>
)
