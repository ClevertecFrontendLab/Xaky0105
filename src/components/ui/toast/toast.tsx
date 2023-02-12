import classNames from 'classnames'

import CloseIcon from './assets/close.svg'
import PositiveIcon from './assets/positive-circle.svg'
import NegativeIcon from './assets/warning-circle.svg'

import styles from './toast.module.scss'

interface IToast {
  message: string
  type: 'positive' | 'negative'
  onClose: () => void
}

export const Toast = ({ message, type, onClose }: IToast) => (
  <div
    className={classNames(
      styles.toast,
      type === 'positive' && styles.positive,
      type === 'negative' && styles.negative
    )}
    data-test-id='error'
  >
    <div className={styles.message}>
      {type === 'positive' ? (
        <div className={styles.icon}>
          <img src={PositiveIcon} alt='positive-icon' />
        </div>
      ) : (
        <div className={styles.icon}>
          <img src={NegativeIcon} alt='negative-icon' />
        </div>
      )}
      <p>{message}</p>
    </div>
    <button className={styles.closeIcon} onClick={onClose} type='button'>
      <img src={CloseIcon} alt='close-icon' />
    </button>
  </div>
)
