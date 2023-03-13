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
  shouldRotateImage?: boolean
}

export const RoundButton = ({
  children,
  changeSorting,
  selectSorting,
  sortingType,
  handler,
  dataTestId,
  shouldRotateImage,
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
      className={classNames(styles.roundButton, {
        [styles.active]: sortingType && sortingType === selectSorting,
      })}
      onClick={clickHandler}
      type='button'
      data-test-id={dataTestId}
    >
      <div
        className={classNames(styles.icon, {
          [styles.rotate]: shouldRotateImage && shouldRotateImage === true,
        })}
      >
        {children}
      </div>
    </button>
  )
}
