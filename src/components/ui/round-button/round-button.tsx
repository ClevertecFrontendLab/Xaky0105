import { ReactNode } from 'react'
import classNames from 'classnames'

import { DataTestId, TypeSortMainPage } from '../../../types/other'

import styles from './round-button.module.scss'

type RoundButtonProps = {
  selectSorting?: TypeSortMainPage
  changeSorting?: (type: TypeSortMainPage) => void
  sortingType?: TypeSortMainPage
  handler?: () => void
  dataTestId?: DataTestId
  children: ReactNode
}

export const RoundButton = ({
  children,
  changeSorting,
  selectSorting,
  sortingType,
  handler,
  dataTestId,
}: RoundButtonProps) => {
  const clickHandler = () => {
    if (selectSorting && changeSorting && sortingType) {
      changeSorting(sortingType)
    } else if (handler) {
      handler()
    }
  }

  return (
    <button
      className={classNames(
        styles.roundButton,
        sortingType && sortingType === selectSorting && styles.active
      )}
      onClick={clickHandler}
      type='button'
      data-test-id={dataTestId}
    >
      <div className={styles.icon}>{children}</div>
    </button>
  )
}
