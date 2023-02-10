import { FC } from 'react'

import loaderIcon from '@/assets/images/loader.svg'

import styles from './loader.module.scss'

export const Loader: FC = () => (
  <div className={styles.loader}>
    <img src={loaderIcon} alt='Loader...' />
  </div>
)
