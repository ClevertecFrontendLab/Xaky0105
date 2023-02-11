import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { selectIsLoadingBooks } from '@/store/books/books.selector'
import { selectIsLoadingCategories } from '@/store/categories/categories.selector'

import { useAppSelector } from '@/hooks/use-redux'
import { useScrollToTop } from '@/hooks/use-scroll-to-top'

import { Loader } from '../loader'
import { OverlayWithPortal } from '../overlay-with-portal'

import { Footer } from './footer'
import { Header } from './header'

import styles from './layout.module.scss'

export const Layout: FC = () => {
  useScrollToTop()
  const isLoadingBooks = useAppSelector(selectIsLoadingBooks)
  const isLoadingCategories = useAppSelector(selectIsLoadingCategories)

  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
      <OverlayWithPortal type='blur' isOpened={isLoadingBooks || isLoadingCategories}>
        <Loader />
      </OverlayWithPortal>
    </div>
  )
}
