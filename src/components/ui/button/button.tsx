import { FC } from 'react'
import clsx from 'clsx'

import styles from './button.module.scss'

interface IButton {
  type: 'button' | 'submit'
  name: string
  clickHandler: () => void
  isDisabled?: boolean
  variant?: 'secondary' | 'primary'
  size?: 'large' | 'small'
  dataTestId?: string
}

export const Button: FC<IButton> = ({
  type = 'button',
  name,
  clickHandler,
  isDisabled = false,
  variant = 'primary',
  size = 'small',
  dataTestId,
}) => (
  <button
    className={clsx(
      styles.btn,
      variant === 'primary' && styles.primary,
      variant === 'secondary' && styles.secondary,
      size === 'large' && styles.large,
      size === 'small' && styles.small
    )}
    type={type === 'button' ? 'button' : 'submit'}
    onClick={e => {
      if (type === 'button') {
        e.preventDefault()
      }
      clickHandler()
    }}
    disabled={isDisabled}
    data-test-id={dataTestId ? dataTestId : ''}
  >
    {name}
  </button>
)
