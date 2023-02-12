import classNames from 'classnames'

import styles from './burger.module.scss'

type BurgerProps = {
  isMenuOpen: boolean
  toggle: () => void
}

export const Burger = ({ isMenuOpen, toggle }: BurgerProps) => (
  <button
    className={classNames(styles.burger, isMenuOpen && styles.cross)}
    onClick={toggle}
    data-test-id='button-burger'
    type='button'
  >
    <span className={styles.burgerItem} />
  </button>
)
