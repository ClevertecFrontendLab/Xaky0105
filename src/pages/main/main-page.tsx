import { useEffect, useState } from 'react'

import { CardList } from '../../components/card-list'
import { Filter } from '../../components/filter'
import { Toast } from '../../components/ui/toast'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { selectBooks } from '../../store/books/books.selector'
import { getBooksFailure, getBooksFetch } from '../../store/books/books.slice'
import { selectCategories } from '../../store/categories/categories.selector'
import { TypeSortMainPage } from '../../types/other'
import { getFilterBooks } from '../../utils/filter'

import styles from './main-page.module.scss'

export const MainPage = () => {
  const dispatch = useAppDispatch()
  const [selectSorting, setSelectSorting] = useState(TypeSortMainPage.tile)
  const [inputText, setInputText] = useState('')

  const { books: booksAll, error } = useAppSelector(selectBooks)
  const { currentCategory } = useAppSelector(selectCategories)

  const [books, setBooks] = useState(booksAll)

  const changeInputText = (value: string) => {
    setInputText(value)
  }

  const changeSorting = (type: TypeSortMainPage) => {
    setSelectSorting(type)
  }

  useEffect(() => {
    if (booksAll && currentCategory) {
      setBooks(getFilterBooks(booksAll, inputText, currentCategory.name))
    }
  }, [inputText, booksAll, currentCategory])

  useEffect(() => {
    if (!booksAll) {
      dispatch(getBooksFetch())
    }
  }, [booksAll, dispatch])

  return (
    <section className={styles.mainPage}>
      {booksAll && (
        <div className={styles.mainContent}>
          <Filter
            changeSorting={changeSorting}
            selectSorting={selectSorting}
            inputText={inputText}
            changeInputText={changeInputText}
          />
          {books ? (
            <CardList selectSorting={selectSorting} cardsData={books} inputText={inputText} />
          ) : (
            <p className={styles.notFound}>По запросу ничего не найдено</p>
          )}
        </div>
      )}
      {error && (
        <Toast message={error} onClose={() => dispatch(getBooksFailure(''))} type='negative' />
      )}
    </section>
  )
}
