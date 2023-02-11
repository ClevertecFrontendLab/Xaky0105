import classNames from 'classnames'

import styles from './burger.module.scss'

interface IBurger {
  isMenuOpen: boolean
  toggle: () => void
}

export const Burger = ({ isMenuOpen, toggle }: IBurger) => (
  <button
    className={classNames(styles.burger, isMenuOpen && styles.cross)}
    onClick={toggle}
    data-test-id='button-burger'
    type='button'
  >
    <span className={styles.burgerItem} />
  </button>
)
