import { Fragment, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '../../../hooks/use-redux'
import { booksSelector } from '../../../store/books/books.selector'
import { logout } from '../../../store/login/login.slice'
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
  const dispatch = useAppDispatch()

  const { categories, books } = useAppSelector(booksSelector)

  const navCategories = useMemo(() => {
    if (books && categories) {
      return createNavCategories(books, categories)
    }

    return null
  }, [books, categories])

  const onClickLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(logout())
  }

  return (
    <Fragment>
      <ul className={styles.categoriesMenuList}>
        <li>
          <button
            className={classNames(styles.categoriesMenuItem, {
              [styles.active]: pathname.includes(Pages.books),
            })}
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
              className={classNames(styles.iconWrapper, {
                [styles.active]: isOpenGenre && pathname.includes(Pages.books),
              })}
            >
              <Chevron
                className={classNames(styles.icon, {
                  [styles.active]: pathname.includes(Pages.books),
                })}
              />
            </span>
          </button>
          <ul
            className={classNames(styles.genreList, {
              [styles.visible]: isOpenGenre && pathname.includes(Pages.books),
            })}
          >
            {navCategories &&
              navCategories.map(({ id, path, name, quantity }) => (
                <li className={styles.genre} key={id}>
                  <Link
                    to={`/${Pages.books}/${path}`}
                    className={classNames(styles.genreLink, {
                      [styles.activeGenreLink]: categoryLocation === path,
                    })}
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
          className={classNames(styles.categoriesMenuItem, {
            [styles.active]: pathname === RoutePath.terms,
          })}
          data-test-id={
            type === NavType.desktop ? DataTestId.NavigationTerms : DataTestId.BurgerTerms
          }
        >
          <Link to={RoutePath.terms} onClick={hideMobileMenu}>
            Правила пользования
          </Link>
        </li>
        <li
          className={classNames(styles.categoriesMenuItem, {
            [styles.active]: pathname === RoutePath.contract,
          })}
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
            className={classNames(styles.categoriesMenuItem, {
              [styles.active]: pathname === RoutePath.profile,
            })}
            onClick={hideMobileMenu}
            role='presentation'
          >
            <Link to={RoutePath.profile}>Профиль</Link>
          </li>
          <li
            className={styles.categoriesMenuItem}
            onClick={onClickLogout}
            role='presentation'
            data-test-id={DataTestId.ExitButton}
          >
            Выход
          </li>
        </ul>
      )}
    </Fragment>
  )
}
