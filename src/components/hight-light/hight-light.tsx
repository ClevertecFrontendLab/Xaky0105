import { Fragment, memo, useCallback } from 'react'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'

import styles from './hight-light.module.scss'

type HightLightProps = {
  searchWord: string
  text: string
  classNameHL: string
  dataTestId?: string
}

export const HightLight = memo(({ searchWord, text, classNameHL, dataTestId }: HightLightProps) => {
  const generateHightLightText = useCallback(
    (str: string) => {
      if (!searchWord) {
        return str
      }

      const regexp = new RegExp(searchWord, 'ig')

      const matchValue = str.match(regexp)

      if (matchValue) {
        return str.split(regexp).map((el, index, array) => {
          if (index < array.length - 1) {
            const selectionLetters = matchValue.shift()

            return (
              <Fragment key={uuidv4()}>
                {el}
                <span className={styles.selectionColor}>{selectionLetters}</span>
              </Fragment>
            )
          }

          return el
        })
      }

      return str
    },
    [searchWord]
  )

  return (
    <p
      data-test-id={dataTestId}
      className={classNames(styles[classNameHL], { [styles.color]: searchWord === text })}
    >
      {generateHightLightText(text)}
    </p>
  )
})
