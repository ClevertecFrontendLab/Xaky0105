import { Fragment } from 'react'

import { Slider } from '../../../components/slider'
import { Button } from '../../../components/ui/button'
import { BookDetailedType } from '../../../types/books'
import { BtnType, BtnVariant, DataTestId, Size } from '../../../types/other'
import { buttonBookingMessage } from '../../../utils/buttons'

import styles from './main-info.module.scss'

type MainInfoProps = {
  book: BookDetailedType
}

export const MainInfo = ({ book }: MainInfoProps) => {
  const { images, title, authors, issueYear, description, booking } = book

  return (
    <Fragment>
      <div className={styles.mainInfo}>
        <Slider images={images} />
        <div className={styles.aboutBlock}>
          <h2 data-test-id={DataTestId.BookTitle} className={styles.title}>
            {title}
          </h2>
          <div className={styles.author}>
            {authors && authors.map(author => <span key={author}>{author}</span>)}, {issueYear}
          </div>
          <div className={styles.btnWrapper}>
            <Button
              size={Size.large}
              name={buttonBookingMessage(booking)}
              type={BtnType.button}
              clickHandler={() => {}}
              isDisabled={!!booking}
              variant={booking ? BtnVariant.secondary : BtnVariant.primary}
            />
          </div>
          <div className={styles.aboutBookFullScreen}>
            <h3 className={styles.subTitle}>О книге</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className={styles.aboutBookTablet}>
        <h3 className={styles.subTitle}>О книге</h3>
        <p>{description}</p>
      </div>
    </Fragment>
  )
}
