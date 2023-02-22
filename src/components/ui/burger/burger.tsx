import classNames from 'classnames'

import { DataTestId } from '../../../types/other'

import styles from './burger.module.scss'

type BurgerProps = {
  isMenuOpen: boolean
  toggle: () => void
}

export const Burger = ({ isMenuOpen, toggle }: BurgerProps) => (
  <button
    className={classNames(styles.burger, { [styles.cross]: isMenuOpen })}
    onClick={toggle}
    data-test-id={DataTestId.ButtonBurger}
    type='button'
  >
    <span className={styles.burgerItem} />
  </button>
)
