import { FC, useEffect } from 'react'
import clsx from 'clsx'
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
      className={clsx(styles.overlay, !isOpened && styles.hide)}
      onClick={onClose}
      role='presentation'
    />
  )
}
