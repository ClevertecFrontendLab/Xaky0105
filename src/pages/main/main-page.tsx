import { useEffect, useState } from 'react'

import { CardList } from '@/components/card-list'
import { Filter } from '@/components/filter'

import { cardsData } from '@/data/cards'

import { TypeSortMainPage } from '@/types/other'

import { getFilterCardsByName } from '@/utils/filter'

import styles from './main-page.module.scss'

export const MainPage = () => {
  const [selectSorting, setSelectSorting] = useState(TypeSortMainPage.tile)
  const [inputText, setInputText] = useState('')
  const [books, setBooks] = useState(cardsData)

  const changeInputText = (value: string) => {
    setInputText(value)
  }

  const changeSorting = (type: TypeSortMainPage) => {
    setSelectSorting(type)
  }

  useEffect(() => {
    setBooks(getFilterCardsByName(cardsData, inputText))
  }, [inputText])

  return (
    <section className={styles.mainPage}>
      <div className={styles.mainContent}>
        <Filter
          changeSorting={changeSorting}
          selectSorting={selectSorting}
          inputText={inputText}
          changeInputText={changeInputText}
        />
        {books.length ? (
          <CardList selectSorting={selectSorting} cardsData={books} inputText={inputText} />
        ) : (
          <p className={styles.notFound}>По запросу ничего не найдено</p>
        )}
      </div>
    </section>
  )
}
