import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { selectBookDetailed } from '@/store/book/book.selector'
import { selectBooks } from '@/store/books/books.selector'
import { selectCategories } from '@/store/categories/categories.selector'
import { getCategoriesFetch } from '@/store/categories/categories.slice'

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { useScrollToTop } from '@/hooks/use-scroll-to-top'

import { Loader } from '../loader'
import { OverlayWithPortal } from '../overlay-with-portal'

import { Footer } from './footer'
import { Header } from './header'

import styles from './layout.module.scss'

export const Layout = () => {
  useScrollToTop()

  const dispatch = useAppDispatch()
  const { isLoading: isLoadingBooks } = useAppSelector(selectBooks)
  const { isLoading: isLoadingCategories, categories } = useAppSelector(selectCategories)
  const { isLoading: isLoadingBookDetails } = useAppSelector(selectBookDetailed)

  useEffect(() => {
    if (!categories) {
      dispatch(getCategoriesFetch())
    }
  }, [dispatch, categories])

  const shouldShowLoader = isLoadingBooks || isLoadingCategories || isLoadingBookDetails

  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
      {shouldShowLoader && (
        <OverlayWithPortal>
          <Loader />
        </OverlayWithPortal>
      )}
    </div>
  )
}
