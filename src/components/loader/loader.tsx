import loaderIcon from '@/assets/images/loader.svg'

import styles from './loader.module.scss'

export const Loader = () => (
  <div className={styles.loader} data-test-id='loader'>
    <img src={loaderIcon} alt='Loader...' />
  </div>
)
