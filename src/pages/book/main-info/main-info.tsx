import { FC, Fragment } from 'react'

import { Slider } from '@/components/slider'
import { Button } from '@/components/ui/button'
import { SubTitle } from '@/components/ui/sub-title'

import { useWindowSize } from '@/hooks/use-window-size'

import { ICardData } from '@/types/books'

import styles from './main-info.module.scss'

interface IMainInfo {
  book: ICardData
}

export const MainInfo: FC<IMainInfo> = ({ book }) => {
  const { x: windowWidth } = useWindowSize()
  const { images } = book

  return (
    <Fragment>
      <div className={styles.mainInfo}>
        <Slider images={images} />
        <div className={styles.aboutBlock}>
          <h2 className={styles.title}>
            Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
          </h2>
          <div className={styles.author}>Адитья Бхаргава, 2019</div>
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
            <p>
              Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких
              задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в
              глубокую философию гениального Кнута, изучить многостраничные фолианты с
              доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?
            </p>
            <p>
              Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это
              просто. А грокать алгоритмы — это веселое и увлекательное занятие.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.aboutBookTablet}>
        <SubTitle text='О книге' />
        <p>
          Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач
          уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую
          философию гениального Кнута, изучить многостраничные фолианты с доказательствами и
          обоснованиями, но хотите ли вы тратить на это свое время?
        </p>
        <p>
          Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это
          просто. А грокать алгоритмы — это веселое и увлекательное занятие.
        </p>
      </div>
    </Fragment>
  )
}
