import { FC } from 'react'

import { SubTitle } from '@/components/ui/sub-title'

import { detailedInfoData } from './detailed-information.data'

import styles from './detailed-information.module.scss'

export const DetailedInformation: FC = () => (
  <div className={styles.detailedInformation}>
    <SubTitle text='Подробная информация' />
    <ul className={styles.infoList}>
      {detailedInfoData.map(({ category, value }) => (
        <li className={styles.infoItem} key={category}>
          <span className={styles.typeInfo}>{category}</span>
          <span className={styles.valueInfo}>{value}</span>
        </li>
      ))}
    </ul>
  </div>
)
