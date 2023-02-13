import { Outlet } from 'react-router-dom'

import { useScrollToTop } from '../../hooks/use-scroll-to-top'

import { Footer } from './footer'
import { Header } from './header'

import styles from './layout.module.scss'

export const Layout = () => {
  useScrollToTop()

  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
