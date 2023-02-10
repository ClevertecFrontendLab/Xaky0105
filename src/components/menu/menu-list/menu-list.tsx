import { FC, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import { RoutePath } from '@/types/other'

import { ReactComponent as Chevron } from '@/assets/images/chevrons/chevron-down.svg'

import { categoriesBookNav } from '../menu.data'

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
  const getDataTestBooks = (id: number) => {
    if (id === 1 && type === 'desktop') {
      return 'navigation-books'
    }
    if (id === 1 && type === 'mobile') {
      return 'burger-books'
    }

    return ''
  }

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
            {categoriesBookNav.map(({ id, category, name, quantity }) => (
              <li className={clsx(styles.genre)} key={id} data-test-id={getDataTestBooks(id)}>
                <Link
                  to={`/books/${category}`}
                  className={clsx(
                    styles.genreLink,
                    categoryLocation === category && styles.activeGenreLink
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
    </Fragment>
  )
}
