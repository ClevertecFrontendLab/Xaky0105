import loaderIcon from './assets/loader.svg'

import styles from './loader.module.scss'

export const Loader = () => (
  <div className={styles.loader} data-test-id='loader'>
    <img src={loaderIcon} alt='Loader...' />
  </div>
)
