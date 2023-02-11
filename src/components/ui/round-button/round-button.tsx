import classNames from 'classnames'

import { TypeSortMainPage } from '@/types/other'

import { ReactComponent as ListImg } from '@/assets/images/action/burger.svg'
import { ReactComponent as Search } from '@/assets/images/action/search.svg'
import { ReactComponent as Sort } from '@/assets/images/action/sort.svg'
import { ReactComponent as TileImg } from '@/assets/images/action/tile.svg'

import styles from './round-button.module.scss'

interface IRoundButton {
  iconType: 'tile' | 'list' | 'sort' | 'search'
  selectSorting?: TypeSortMainPage
  changeSorting?: (type: TypeSortMainPage) => void
  sortingType?: TypeSortMainPage
  handler?: () => void
  dataTestId?: string
}

export const RoundButton = ({
  iconType,
  changeSorting,
  selectSorting,
  sortingType,
  handler,
  dataTestId,
}: IRoundButton) => {
  const clickHandler = () => {
    if (selectSorting && changeSorting && sortingType) {
      changeSorting(sortingType)
    } else if (handler) {
      handler()
    }
  }

  const cn = classNames(
    styles.roundButton,
    sortingType && sortingType === selectSorting && styles.active
  )

  const getImage = () => {
    switch (iconType) {
      case 'tile':
        return <TileImg className={styles.icon} />
      case 'search':
        return <Search className={styles.icon} />
      case 'sort':
        return <Sort className={styles.icon} />
      case 'list':
        return <ListImg className={styles.icon} />
      default:
        return null
    }
  }

  return (
    <button className={cn} onClick={clickHandler} type='button' data-test-id={dataTestId}>
      {getImage()}
    </button>
  )
}
