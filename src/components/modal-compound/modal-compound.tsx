import { ReactNode } from 'react'
import classNames from 'classnames'

import { DataTestId } from '../../types/other'

import styles from './modal-compound.module.scss'

type ModalCompoundProps = {
  children: ReactNode
  className?: string
  dataTestId?: DataTestId
}

export const ModalCompound = ({ children, className, dataTestId }: ModalCompoundProps) => (
  <div
    className={classNames(styles.modalCompound, className && styles[className])}
    data-test-id={dataTestId}
  >
    {children}
  </div>
)
