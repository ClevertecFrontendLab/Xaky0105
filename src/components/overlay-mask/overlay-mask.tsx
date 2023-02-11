import { FC, useEffect } from 'react'
import classNames from 'classnames'
import noScroll from 'no-scroll'

import styles from './overlay-mask.module.scss'

interface IOverlayMask {
  onClose: () => void
  isOpened: boolean
}

export const OverlayMask: FC<IOverlayMask> = ({ onClose, isOpened }) => {
  useEffect(() => (isOpened ? noScroll.on() : noScroll.off()), [isOpened])

  return (
    <div
      className={classNames(styles.overlay, !isOpened && styles.hide)}
      onClick={onClose}
      role='presentation'
    />
  )
}
