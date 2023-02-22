import { Fragment, memo, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { DataTestId } from '../../types/other'

import styles from './hight-light.module.scss'

type HightLightProps = {
  searchWord: string
  text: string
  classNameHL: string
}

export const HightLight = memo(({ searchWord, text, classNameHL }: HightLightProps) => {
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
                <span data-test-id={DataTestId.HighLightMatches} className={styles.selectionColor}>
                  {selectionLetters}
                </span>
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

  return <p className={classNameHL}>{generateHightLightText(text)}</p>
})
