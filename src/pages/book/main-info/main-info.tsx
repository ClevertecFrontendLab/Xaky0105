import { FC, Fragment } from 'react'

import { Slider } from '@/components/slider'
import { Button } from '@/components/ui/button'
import { SubTitle } from '@/components/ui/sub-title'

import { useWindowSize } from '@/hooks/use-window-size'

import { IBookDetailed } from '@/types/books'

import styles from './main-info.module.scss'

interface IMainInfo {
  book: IBookDetailed
}

export const MainInfo: FC<IMainInfo> = ({ book }) => {
  const { x: windowWidth } = useWindowSize()
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
            <Button
              size={windowWidth > 500 ? 'large' : 'small'}
              name='Забронировать'
              type='button'
              clickHandler={() => {}}
            />
          </div>
          <div className={styles.aboutBookFullScreen}>
            <SubTitle text='О книге' />
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className={styles.aboutBookTablet}>
        <SubTitle text='О книге' />
        <p>{description}</p>
      </div>
    </Fragment>
  )
}
