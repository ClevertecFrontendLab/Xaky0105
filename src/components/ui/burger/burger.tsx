import { FC } from 'react'
import clsx from 'clsx'

import styles from './burger.module.scss'

interface IBurger {
  isMenuOpen: boolean
  toggle: () => void
}

export const Burger: FC<IBurger> = ({ isMenuOpen, toggle }) => (
  <button
    className={clsx(styles.burger, isMenuOpen && styles.cross)}
    onClick={toggle}
    data-test-id='button-burger'
    type='button'
  >
    <span className={styles.burgerItem} />
  </button>
)
