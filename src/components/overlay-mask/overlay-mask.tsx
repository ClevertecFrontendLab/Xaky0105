import { useEffect } from 'react'
import classNames from 'classnames'
import noScroll from 'no-scroll'

import styles from './overlay-mask.module.scss'

type OverlayMaskProps = {
  onClose: () => void
  isOpened: boolean
}

export const OverlayMask = ({ onClose, isOpened }: OverlayMaskProps) => {
  useEffect(() => (isOpened ? noScroll.on() : noScroll.off()), [isOpened])

  return (
    <div
      className={classNames(styles.overlay, { [styles.hide]: !isOpened })}
      onClick={onClose}
      role='presentation'
    />
  )
}
