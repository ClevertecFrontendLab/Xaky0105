import { DataTestId } from '../../types/other'

import loaderIcon from './assets/loader.svg'

import styles from './loader.module.scss'

export const Loader = () => (
  <div className={styles.loader} data-test-id={DataTestId.loader}>
    <img src={loaderIcon} alt='Loader...' />
  </div>
)
