import { Fragment, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import { useAppSelector } from '../../../hooks/use-redux'
import { booksSelector } from '../../../store/books/books.selector'
import { AllBooks, DataTestId, NavType, Pages, RoutePath } from '../../../types/other'
import { createNavCategories } from '../../../utils/categories'

import { ReactComponent as Chevron } from './assets/chevron-down.svg'

import styles from './menu-list.module.scss'

const getDataTestIdBooks = (path: string, navType: string) => {
  if (path === AllBooks.path && navType === NavType.desktop) {
    return DataTestId.NavigationBooks
  }
  if (path === AllBooks.path && navType === NavType.mobile) {
    return DataTestId.BurgerBooks
  }
  if (navType === NavType.desktop) {
    return `navigation-${path}`
  }
  if (navType === NavType.mobile) {
    return `burger-${path}`
  }

  return ''
}

type MenuListProps = {
  pathname: string
  toggleIsOpenGenre: () => void
  isOpenGenre: boolean
  categoryLocation?: string
  type: NavType
  hideMobileMenu?: () => void
  showGenreList: () => void
}

export const MenuList = ({
  pathname,
  toggleIsOpenGenre,
  isOpenGenre,
  categoryLocation,
  type,
  hideMobileMenu,
  showGenreList,
}: MenuListProps) => {
  const navigate = useNavigate()

  const { categories, books } = useAppSelector(booksSelector)

  const navCategories = useMemo(
    () => books && categories && createNavCategories(books, categories),
    [books, categories]
  )

  return (
    <Fragment>
      <ul className={styles.categoriesMenuList}>
        <li>
          <button
            className={classNames(
              styles.categoriesMenuItem,
              pathname.includes(Pages.books) && styles.active
            )}
            onClick={() => {
              if (pathname.includes(Pages.books)) {
                toggleIsOpenGenre()
              } else {
                showGenreList()
              }
              navigate(RoutePath.booksAll)
            }}
            data-test-id={
              type === NavType.desktop ? DataTestId.NavigationShowcase : DataTestId.BurgerShowcase
            }
            type='button'
          >
            <span>Витрина книг</span>
            <span
              className={classNames(
                styles.iconWrapper,
                isOpenGenre && pathname.includes(Pages.books) && styles.active
              )}
            >
              <Chevron
                className={classNames(styles.icon, pathname.includes(Pages.books) && styles.active)}
              />
            </span>
          </button>
          <ul
            className={classNames(
              styles.genreList,
              isOpenGenre && pathname.includes(Pages.books) && styles.visible
            )}
          >
            {navCategories &&
              navCategories.map(({ id, path, name, quantity }) => (
                <li className={classNames(styles.genre)} key={id}>
                  <Link
                    to={`/${Pages.books}/${path}`}
                    className={classNames(
                      styles.genreLink,
                      categoryLocation === path && styles.activeGenreLink
                    )}
                    onClick={hideMobileMenu}
                    state={{ quantityBooks: quantity }}
                  >
                    <span data-test-id={getDataTestIdBooks(path, type)}>{name}</span>
                    <span
                      data-test-id={
                        type === NavType.desktop
                          ? `navigation-book-count-for-${path}`
                          : `burger-book-count-for-${path}`
                      }
                      className={styles.quantity}
                    >
                      {quantity}
                    </span>
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
          data-test-id={
            type === NavType.desktop ? DataTestId.NavigationTerms : DataTestId.BurgerTerms
          }
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
          data-test-id={
            type === NavType.desktop ? DataTestId.NavigationContract : DataTestId.BurgerContract
          }
        >
          <Link to={RoutePath.contract} onClick={hideMobileMenu}>
            Договор оферты
          </Link>
        </li>
      </ul>
      {type === NavType.mobile && (
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
    </Fragment>
  )
}
