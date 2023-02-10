import { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { useBooleanState } from '@/hooks/use-boolean-state'

import { MenuList } from '../menu-list/menu-list'

import styles from './menu-desktop.module.scss'

export const MenuDesktop: FC = () => {
  const { pathname } = useLocation()
  const { category: categoryLocation } = useParams()

  const {
    state: isOpenGenre,
    toggle: toggleIsOpenGenre,
    setTrue: showGenreList,
  } = useBooleanState(true)

  return (
    <nav className={styles.navDesktop}>
      <MenuList
        pathname={pathname}
        categoryLocation={categoryLocation}
        toggleIsOpenGenre={toggleIsOpenGenre}
        showGenreList={showGenreList}
        isOpenGenre={isOpenGenre}
        type='desktop'
      />
    </nav>
  )
}
