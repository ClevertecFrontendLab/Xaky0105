import { BookDetailedType } from '../../../types/books'

import { detailInfoData } from './detailed-information.data'

import styles from './detailed-information.module.scss'

type DetailedInformationProps = {
  book: BookDetailedType
}

export const DetailedInformation = ({ book }: DetailedInformationProps) => (
  <div className={styles.detailedInformation}>
    <h3 className={styles.subTitle}>Подробная информация</h3>
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
