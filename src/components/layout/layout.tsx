import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { selectIsLoadingBook } from '@/store/book/book.selector'
import { selectIsLoadingBooks } from '@/store/books/books.selector'
import { selectCategories, selectIsLoadingCategories } from '@/store/categories/categories.selector'
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
  const isLoadingBooks = useAppSelector(selectIsLoadingBooks)
  const isLoadingCategories = useAppSelector(selectIsLoadingCategories)
  const isLoadingBookDetails = useAppSelector(selectIsLoadingBook)
  const categories = useAppSelector(selectCategories)

  useEffect(() => {
    if (categories && !categories.length) {
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
