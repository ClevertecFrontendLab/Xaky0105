import { FC, Fragment, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import { Toast } from '@/components/ui/toast'

import { selectBooksAll } from '@/store/books/books.selector'
import { selectCategories, selectErrorCategories } from '@/store/categories/categories.selector'
import { getCategoriesFailure, getCategoriesFetch } from '@/store/categories/categories.slice'

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'

import { RoutePath } from '@/types/other'

import { createNavCategories } from '@/utils/categories'

import { ReactComponent as Chevron } from '@/assets/images/chevrons/chevron-down.svg'

import styles from './menu-list.module.scss'

interface IMenuList {
  pathname: string
  toggleIsOpenGenre: () => void
  isOpenGenre: boolean
  categoryLocation: string | undefined
  type: 'desktop' | 'mobile'
  hideMobileMenu?: () => void
  showGenreList: () => void
}

export const MenuList: FC<IMenuList> = ({
  pathname,
  toggleIsOpenGenre,
  isOpenGenre,
  categoryLocation,
  type,
  hideMobileMenu,
  showGenreList,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const categories = useAppSelector(selectCategories)
  const categoriesError = useAppSelector(selectErrorCategories)

  const books = useAppSelector(selectBooksAll)

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategoriesFetch())
    }
  }, [dispatch, categories])

  const getDataTestBooks = (id: number) => {
    if (id === 1 && type === 'desktop') {
      return 'navigation-books'
    }
    if (id === 1 && type === 'mobile') {
      return 'burger-books'
    }

    return ''
  }

  const navCategories = useMemo(() => createNavCategories(books, categories), [books, categories])

  return (
    <Fragment>
      <ul className={styles.categoriesMenuList}>
        <li>
          <button
            className={clsx(
              styles.categoriesMenuItem,
              pathname.includes('/books') && styles.active
            )}
            onClick={() => {
              if (pathname.includes('/books')) {
                toggleIsOpenGenre()
              } else {
                showGenreList()
              }
              navigate('/books/all')
            }}
            data-test-id={type === 'desktop' ? 'navigation-showcase' : 'burger-showcase'}
            type='button'
          >
            <span>Витрина книг</span>
            <span
              className={clsx(
                styles.iconWrapper,
                isOpenGenre && pathname.includes('/books') && styles.active
              )}
            >
              <Chevron
                className={clsx(styles.icon, pathname.includes('/books') && styles.active)}
              />
            </span>
          </button>
          <ul
            className={clsx(
              styles.genreList,
              isOpenGenre && pathname.includes('/books') && styles.visible
            )}
          >
            {navCategories.map(({ id, path, name, quantity }) => (
              <li className={clsx(styles.genre)} key={id} data-test-id={getDataTestBooks(id)}>
                <Link
                  to={`/books/${path}`}
                  className={clsx(
                    styles.genreLink,
                    categoryLocation === path && styles.activeGenreLink
                  )}
                  onClick={hideMobileMenu}
                >
                  {name}
                  <span className={styles.quantity}>{quantity}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li
          className={clsx(styles.categoriesMenuItem, pathname === RoutePath.terms && styles.active)}
          data-test-id={type === 'desktop' ? 'navigation-terms' : 'burger-terms'}
        >
          <Link to={RoutePath.terms} onClick={hideMobileMenu}>
            Правила пользования
          </Link>
        </li>
        <li
          className={clsx(
            styles.categoriesMenuItem,
            pathname === RoutePath.contract && styles.active
          )}
          data-test-id={type === 'desktop' ? 'navigation-contract' : 'burger-contract'}
        >
          <Link to={RoutePath.contract} onClick={hideMobileMenu}>
            Договор оферты
          </Link>
        </li>
      </ul>
      {type === 'mobile' && (
        <ul className={styles.categoriesMenuList}>
          <li
            className={clsx(
              styles.categoriesMenuItem,
              pathname === RoutePath.profile && styles.active
            )}
            onClick={hideMobileMenu}
            role='presentation'
          >
            <Link to={RoutePath.profile}>Профиль</Link>
          </li>
          <li
            className={clsx(styles.categoriesMenuItem)}
            onClick={hideMobileMenu}
            role='presentation'
          >
            Выход
          </li>
        </ul>
      )}
      {categoriesError && (
        <Toast
          message={categoriesError}
          onClose={() => dispatch(getCategoriesFailure(''))}
          type='negative'
        />
      )}
    </Fragment>
  )
}
