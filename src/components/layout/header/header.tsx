import { Link } from 'react-router-dom'

import { useBooleanState } from '../../../hooks/use-boolean-state'
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

  return (
    <Container>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <Burger toggle={toggleMenu} isMenuOpen={isShowMobileMenu} />
          <Link to='/' className={styles.logoWrapper}>
            <img src={logo} alt='logo' />
          </Link>
          <h1 className={styles.title}>Библиотека</h1>
        </div>
        <div className={styles.user}>
          <span className={styles.userName}>Привет, Иван</span>
          <div className={styles.avatarWrapper}>
            <img src={avatar} alt='user' />
          </div>
        </div>
        <MenuMobile isOpened={isShowMobileMenu} hideMobileMenu={hideMobileMenu} />
        <OverlayMask onClose={hideMobileMenu} isOpened={isShowMobileMenu} />
      </header>
    </Container>
  )
}
