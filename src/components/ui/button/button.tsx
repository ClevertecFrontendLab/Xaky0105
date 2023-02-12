import classNames from 'classnames'

import styles from './button.module.scss'

type ButtonProps = {
  type: 'button' | 'submit'
  name: string
  clickHandler: () => void
  isDisabled?: boolean
  variant?: 'secondary' | 'primary'
  size?: 'large' | 'small'
  dataTestId?: string
}

export const Button = ({
  type = 'button',
  name,
  clickHandler,
  isDisabled = false,
  variant = 'primary',
  size = 'small',
  dataTestId,
}: ButtonProps) => (
  <button
    className={classNames(
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
