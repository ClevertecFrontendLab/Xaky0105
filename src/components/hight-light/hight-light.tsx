import { Fragment, memo, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

import styles from './hight-light.module.scss'

interface IHightLight {
  searchWord: string
  text: string
  classNameHL: string
}

export const HightLight = memo(({ searchWord, text, classNameHL }: IHightLight) => {
  const generateHightLightText = useCallback(
    (str: string) => {
      if (!searchWord) {
        return str
      }
      const regexp = new RegExp(searchWord, 'ig')
      const matchValue = str.match(regexp)

      if (matchValue) {
        return str.split(regexp).map(el => {
          const selectionLetters = matchValue.shift()

          return (
            <Fragment key={uuidv4()}>
              {el}
              <span className={styles.selectionColor}>{selectionLetters}</span>
            </Fragment>
          )
        })
      }

      return str
    },
    [searchWord]
  )

  return <p className={classNameHL}>{generateHightLightText(text)}</p>
})
