import { useLocation, useParams } from 'react-router-dom'
import classNames from 'classnames'

import { useBooleanState } from '../../../hooks/use-boolean-state'
import { DataTestId, NavType } from '../../../types/other'
import { MenuList } from '../menu-list/menu-list'

import styles from './menu-mobile.module.scss'

type MenuMobileProps = {
  hideMobileMenu: () => void
  isOpened: boolean
}

export const MenuMobile = ({ hideMobileMenu, isOpened }: MenuMobileProps) => {
  const { pathname } = useLocation()
  const { category: categoryLocation } = useParams()

  const {
    state: isOpenGenre,
    toggle: toggleIsOpenGenre,
    setTrue: showGenreList,
  } = useBooleanState(true)

  return (
    <nav
      className={classNames(styles.navMobile, { [styles.active]: isOpened })}
      data-test-id={DataTestId.BurgerNavigation}
    >
      <MenuList
        pathname={pathname}
        categoryLocation={categoryLocation}
        toggleIsOpenGenre={toggleIsOpenGenre}
        showGenreList={showGenreList}
        isOpenGenre={isOpenGenre}
        hideMobileMenu={hideMobileMenu}
        type={NavType.mobile}
      />
    </nav>
  )
}
