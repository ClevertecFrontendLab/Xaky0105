import { FC } from 'react'

import styles from './sub-title.module.scss'

export const SubTitle: FC<{ text: string }> = ({ text }) => (
  <h3 className={styles.subTitle}>{text}</h3>
)
