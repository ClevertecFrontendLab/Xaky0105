import classNames from 'classnames'

import { BtnType, BtnVariant, DataTestId, Size } from '../../../types/other'

import styles from './button.module.scss'

type ButtonProps = {
  type: BtnType
  name: string
  clickHandler: () => void
  isDisabled?: boolean
  variant?: BtnVariant
  size?: Size
  dataTestId?: DataTestId
}

export const Button = ({
  type = BtnType.button,
  name,
  clickHandler,
  isDisabled = false,
  variant = BtnVariant.primary,
  size = Size.small,
  dataTestId,
}: ButtonProps) => (
  <button
    className={classNames(
      styles.btn,
      variant === BtnVariant.primary && styles.primary,
      variant === BtnVariant.secondary && styles.secondary,
      size === Size.large && styles.large,
      size === Size.small && styles.small
    )}
    type={type === BtnType.button ? 'button' : 'submit'}
    onClick={e => {
      if (type === BtnType.button) {
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
