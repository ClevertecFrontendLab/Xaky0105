import { Fragment, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '../../../hooks/use-redux'
import { booksSelector } from '../../../store/books/books.selector'
import { setCurrentCategory } from '../../../store/books/books.slice'
import { AllBooks, DataTestId, NavType, Pages, RoutePath } from '../../../types/other'
import { createNavCategories } from '../../../utils/categories'

import { ReactComponent as Chevron } from './assets/chevron-down.svg'

import styles from './menu-list.module.scss'

const getDataTestIdBooks = (path: string, navType: string) => {
  if (path === AllBooks.path && navType === NavType.desktop) {
    return DataTestId['navigation-books']
  }
  if (path === AllBooks.path && navType === NavType.mobile) {
    return DataTestId['burger-books']
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

  const navCategories = useMemo(
    () => books && categories && createNavCategories(books, categories),
    [books, categories]
  )

  const findCategory = categories && categories.find(category => category.path === categoryLocation)

  useEffect(() => {
    if (categoryLocation) {
      dispatch(
        setCurrentCategory(
          findCategory ? findCategory : { id: 0, name: AllBooks.name, path: AllBooks.path }
        )
      )
    }
  }, [dispatch, categoryLocation, findCategory])

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
              type === NavType.desktop
                ? DataTestId['navigation-showcase']
                : DataTestId['burger-showcase']
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
                <li
                  className={classNames(styles.genre)}
                  key={id}
                  data-test-id={getDataTestIdBooks(path, type)}
                >
                  <Link
                    to={`/${Pages.books}/${path}`}
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
          data-test-id={
            type === NavType.desktop ? DataTestId['navigation-terms'] : DataTestId['burger-terms']
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
            type === NavType.desktop
              ? DataTestId['navigation-contract']
              : DataTestId['burger-contract']
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
