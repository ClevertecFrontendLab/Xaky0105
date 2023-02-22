import { ReactNode, useEffect } from 'react'
import classNames from 'classnames'
import noScroll from 'no-scroll'

import { OverlayType } from '../../types/other'
import { Portal } from '../portal/portal'

import styles from './overlay-with-portal.module.scss'

type OverlayProps = {
  children: ReactNode
  onClose?: () => void
  type?: OverlayType
}

export const OverlayWithPortal = ({ children, onClose, type = OverlayType.blur }: OverlayProps) => {
  useEffect(() => {
    noScroll.on()

    return () => {
      noScroll.off()
    }
  }, [])

  return (
    <Portal>
      <div className={styles.container}>
        <div
          className={classNames(styles.overlay, {
            [styles.orange]: type === OverlayType.orange,
            [styles.blur]: type === OverlayType.blur,
            [styles.transparent]: type === OverlayType.transparent,
          })}
          onClick={onClose}
          role='presentation'
        />
        {children}
      </div>
    </Portal>
  )
}
