import { FC, Fragment, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import { Toast } from '@/components/ui/toast'

import { selectBooksAll } from '@/store/books/books.selector'
import { selectCategories, selectErrorCategories } from '@/store/categories/categories.selector'
import { getCategoriesFailure } from '@/store/categories/categories.slice'

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'

import { RoutePath } from '@/types/other'

import { createNavCategories } from '@/utils/categories'

import { ReactComponent as Chevron } from '@/assets/images/chevrons/chevron-down.svg'

import styles from './menu-list.module.scss'

const getDataTestIdBooks = (path: string, navType: string) => {
  if (path === 'all' && navType === 'desktop') {
    return 'navigation-books'
  }
  if (path === 'all' && navType === 'mobile') {
    return 'burger-books'
  }

  return ''
}

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

  const navCategories = useMemo(() => createNavCategories(books, categories), [books, categories])

  return (
    <Fragment>
      <ul className={styles.categoriesMenuList}>
        <li>
          <button
            className={classNames(
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
              className={classNames(
                styles.iconWrapper,
                isOpenGenre && pathname.includes('/books') && styles.active
              )}
            >
              <Chevron
                className={classNames(styles.icon, pathname.includes('/books') && styles.active)}
              />
            </span>
          </button>
          <ul
            className={classNames(
              styles.genreList,
              isOpenGenre && pathname.includes('/books') && styles.visible
            )}
          >
            {navCategories.map(({ id, path, name, quantity }) => (
              <li
                className={classNames(styles.genre)}
                key={id}
                data-test-id={getDataTestIdBooks(path, type)}
              >
                <Link
                  to={`/books/${path}`}
                  className={classNames(
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
          className={classNames(
            styles.categoriesMenuItem,
            pathname === RoutePath.terms && styles.active
          )}
          data-test-id={type === 'desktop' ? 'navigation-terms' : 'burger-terms'}
        >
          <Link to={RoutePath.terms} onClick={hideMobileMenu}>
            Правила пользования
          </Link>
        </li>
        <li
          className={classNames(
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
            className={classNames(
              styles.categoriesMenuItem,
              pathname === RoutePath.profile && styles.active
            )}
            onClick={hideMobileMenu}
            role='presentation'
          >
            <Link to={RoutePath.profile}>Профиль</Link>
          </li>
          <li
            className={classNames(styles.categoriesMenuItem)}
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
