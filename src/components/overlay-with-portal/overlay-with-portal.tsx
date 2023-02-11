import { FC, ReactNode, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import noScroll from 'no-scroll'

import { Portal } from '../portal/portal'

import styles from './overlay-with-portal.module.scss'

type OverlayType = {
  children: ReactNode
  onClose?: () => void
  isOpened: boolean
  type?: 'orange' | 'blur' | 'transparent'
  timeout?: boolean
}

export const OverlayWithPortal: FC<OverlayType> = ({
  children,
  onClose,
  isOpened,
  type = 'blur',
  timeout = true,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => (isOpened ? noScroll.on() : noScroll.off()), [isOpened])

  return (
    <CSSTransition
      in={isOpened}
      nodeRef={nodeRef}
      timeout={timeout ? 100 : 0}
      classNames={{
        enterActive: styles.enterActive,
        enterDone: styles.enter,
        exitActive: styles.exitActive,
        exitDone: styles.exit,
      }}
      unmountOnExit={true}
    >
      <Portal>
        <div className={styles.container}>
          <div
            ref={nodeRef}
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
    </CSSTransition>
  )
}
