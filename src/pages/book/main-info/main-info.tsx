import { Fragment } from 'react'

import { Slider } from '@/components/slider'
import { Button } from '@/components/ui/button'

import { IBookDetailed } from '@/types/books'

import styles from './main-info.module.scss'

interface IMainInfo {
  book: IBookDetailed
}

export const MainInfo = ({ book }: IMainInfo) => {
  const { images, title, authors, issueYear, description } = book

  return (
    <Fragment>
      <div className={styles.mainInfo}>
        <Slider images={images} />
        <div className={styles.aboutBlock}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.author}>
            {authors.map(author => (
              <span key={author}>{author}</span>
            ))}
            , {issueYear}
          </div>
          <div className={styles.btnWrapper}>
            <Button size='large' name='Забронировать' type='button' clickHandler={() => {}} />
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
