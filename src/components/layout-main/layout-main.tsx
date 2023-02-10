import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Container } from '../container'
import { MenuDesktop } from '../menu'

import styles from './layout-main.module.scss'

export const LayoutMain: FC = () => (
  <div className={styles.layoutMain}>
    <Container>
      <div className={styles.layoutMainContainer}>
        <MenuDesktop />
        <Outlet />
      </div>
    </Container>
  </div>
)
