import { Link } from 'react-router-dom'

import { Container } from '@/components/container'
import { MenuMobile } from '@/components/menu'
import { OverlayMask } from '@/components/overlay-mask'
import { Burger } from '@/components/ui/burger'

import { useBooleanState } from '@/hooks/use-boolean-state'

import avatar from '@/assets/images/avatar.png'
import logo from '@/assets/images/logo.png'

import styles from './header.module.scss'

export const Header = () => {
  const {
    state: isShowMobileMenu,
    setFalse: hideMobileMenu,
    toggle: toggleMenu,
  } = useBooleanState()

  return (
    <header className={styles.headerWrapper}>
      <Container>
        <div className={styles.header}>
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
        </div>
      </Container>
    </header>
  )
}
