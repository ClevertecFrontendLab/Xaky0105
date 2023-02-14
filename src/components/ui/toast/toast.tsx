import classNames from 'classnames'

import { DataTestId, ToastVariant } from '../../../types/other'

import CloseIcon from './assets/close.svg'
import PositiveIcon from './assets/positive-circle.svg'
import NegativeIcon from './assets/warning-circle.svg'

import styles from './toast.module.scss'

type ToastProps = {
  message: string
  type: ToastVariant
  onClose: () => void
}

export const Toast = ({ message, type, onClose }: ToastProps) => (
  <div
    className={classNames(
      styles.toast,
      type === ToastVariant.positive && styles.positive,
      type === ToastVariant.negative && styles.negative
    )}
    data-test-id={DataTestId.error}
  >
    <div className={styles.message}>
      {type === ToastVariant.positive ? (
        <img className={styles.icon} src={PositiveIcon} alt='positive-icon' />
      ) : (
        <img className={styles.icon} src={NegativeIcon} alt='negative-icon' />
      )}
      <p>{message}</p>
    </div>
    <button className={styles.closeIcon} onClick={onClose} type='button'>
      <img src={CloseIcon} alt='close-icon' />
    </button>
  </div>
)
