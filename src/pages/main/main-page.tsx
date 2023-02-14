import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { CardList } from '../../components/card-list'
import { Filter } from '../../components/filter'
import { Loader } from '../../components/loader'
import { OverlayWithPortal } from '../../components/overlay-with-portal'
import { Toast } from '../../components/ui/toast'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { booksSelector } from '../../store/books/books.selector'
import { getBooksFailure, getBooksRequest } from '../../store/books/books.slice'
import { ToastVariant, TypeSortMainPage } from '../../types/other'
import { getFilterBooks } from '../../utils/filter'

import styles from './main-page.module.scss'

export const MainPage = () => {
  const dispatch = useAppDispatch()
  const [selectSorting, setSelectSorting] = useState(TypeSortMainPage.tile)
  const [inputText, setInputText] = useState('')

  const { category } = useParams()

  const { books: booksAll, error, isLoading, categories } = useAppSelector(booksSelector)

  const [books, setBooks] = useState(booksAll)

  const changeInputText = (value: string) => {
    setInputText(value)
  }

  const changeSorting = (type: TypeSortMainPage) => {
    setSelectSorting(type)
  }

  useEffect(() => {
    if (booksAll && category) {
      setBooks(getFilterBooks(booksAll, inputText, categories, category))
    }
  }, [inputText, booksAll, categories, category])

  useEffect(() => {
    if (!books) {
      dispatch(getBooksRequest())
    }
  }, [dispatch, books])

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
        <Toast
          message={error}
          onClose={() => dispatch(getBooksFailure(null))}
          type={ToastVariant.negative}
        />
      )}
      {isLoading && (
        <OverlayWithPortal>
          <Loader />
        </OverlayWithPortal>
      )}
    </section>
  )
}
