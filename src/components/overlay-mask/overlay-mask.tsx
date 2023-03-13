import { useEffect } from 'react'
import classNames from 'classnames'
import noScroll from 'no-scroll'

import styles from './overlay-mask.module.scss'

type OverlayMaskProps = {
  onClose: () => void
  isOpened: boolean
  className?: string
}

export const OverlayMask = ({ onClose, isOpened, className }: OverlayMaskProps) => {
  useEffect(() => (isOpened ? noScroll.on() : noScroll.off()), [isOpened])

  return (
    <div
      className={classNames(
        styles.overlay,
        {
          [styles.hide]: !isOpened,
        },
        className && styles[className]
      )}
      onClick={onClose}
      role='presentation'
    />
  )
}
