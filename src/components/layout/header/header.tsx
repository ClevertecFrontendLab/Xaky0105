import { Link } from 'react-router-dom'

import { useBooleanState } from '../../../hooks/use-boolean-state'
import { useAppDispatch, useAppSelector } from '../../../hooks/use-redux'
import { loginSelector } from '../../../store/login/login.selector'
import { logout } from '../../../store/login/login.slice'
import { RoutePath } from '../../../types/other'
import { Container } from '../../container'
import { MenuMobile } from '../../menu'
import { OverlayMask } from '../../overlay-mask'
import { Burger } from '../../ui/burger'

import avatar from './assets/avatar.png'
import logo from './assets/logo.png'

import styles from './header.module.scss'

export const Header = () => {
  const {
    state: isShowMobileMenu,
    setFalse: hideMobileMenu,
    toggle: toggleMenu,
  } = useBooleanState()

  const {
    state: isShowUserMenu,
    setFalse: hideUserMenu,
    setTrue: showUserMenu,
  } = useBooleanState(false)

  const { user } = useAppSelector(loginSelector)
  const dispatch = useAppDispatch()

  const onClickLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(logout())
  }

  return (
    <Container>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <Burger toggle={toggleMenu} isMenuOpen={isShowMobileMenu} />
          <Link to={RoutePath.main} className={styles.logoWrapper}>
            <img src={logo} alt='logo' />
          </Link>
          <h1 className={styles.title}>Библиотека</h1>
        </div>
        <div className={styles.user}>
          <span className={styles.userName}>Привет, {user?.firstName}</span>
          <div className={styles.avatarWrapper} onClick={showUserMenu} role='presentation'>
            <img src={avatar} alt='user' />
          </div>
        </div>
        <MenuMobile isOpened={isShowMobileMenu} hideMobileMenu={hideMobileMenu} />
        {isShowUserMenu && (
          <div className={styles.userMenu}>
            <ul className={styles.userList}>
              <li className={styles.item}>Профиль</li>
              <li className={styles.item} onClick={onClickLogout} role='presentation'>
                Выйти
              </li>
            </ul>
          </div>
        )}

        <OverlayMask
          onClose={isShowMobileMenu ? hideMobileMenu : hideUserMenu}
          isOpened={isShowMobileMenu || isShowUserMenu}
          className={isShowUserMenu ? 'hightZIndex' : ''}
        />
      </header>
    </Container>
  )
}
