import { ReactNode, useEffect } from 'react'
import classNames from 'classnames'
import noScroll from 'no-scroll'

import { Portal } from '../portal/portal'

import styles from './overlay-with-portal.module.scss'

type OverlayProps = {
  children: ReactNode
  onClose?: () => void
  type?: 'orange' | 'blur' | 'transparent'
}

export const OverlayWithPortal = ({ children, onClose, type = 'blur' }: OverlayProps) => {
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
          className={classNames(
            styles.overlay,
            type === 'orange' && styles.orange,
            type === 'blur' && styles.blur,
            type === 'transparent' && styles.transparent
          )}
          onClick={onClose}
          role='presentation'
        />
        {children}
      </div>
    </Portal>
  )
}
