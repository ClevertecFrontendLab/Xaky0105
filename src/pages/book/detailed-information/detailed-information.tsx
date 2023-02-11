import { SubTitle } from '@/components/ui/sub-title'

import { IBookDetailed } from '@/types/books'

import { detailInfoData } from './detailed-information.data'

import styles from './detailed-information.module.scss'

interface IDetailedInformation {
  book: IBookDetailed
}

export const DetailedInformation = ({ book }: IDetailedInformation) => (
  <div className={styles.detailedInformation}>
    <SubTitle text='Подробная информация' />
    <ul className={styles.infoList}>
      {detailInfoData(book).map(info => (
        <li className={styles.infoItem} key={info.type}>
          <span className={styles.typeInfo}>{info.type}</span>
          <span className={styles.valueInfo}>{info.value}</span>
        </li>
      ))}
    </ul>
  </div>
)
