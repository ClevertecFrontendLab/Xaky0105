import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { CardList } from '@/components/card-list'
import { Filter } from '@/components/filter'
import { Loader } from '@/components/loader'
import { OverlayWithPortal } from '@/components/overlay-with-portal'
import { Toast } from '@/components/ui/toast'

import {
  selectBooksAll,
  selectErrorBooks,
  selectIsLoadingBooks,
} from '@/store/books/books.selector'
import { getBooksFailure, getBooksFetch } from '@/store/books/books.slice'
import { selectCategories } from '@/store/categories/categories.selector'

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'

import { TypeSortMainPage } from '@/types/other'

import { getTranslateCategory } from '@/utils/categories'
import { getFilterBooks } from '@/utils/filter'

import styles from './main-page.module.scss'

interface ParamsMain {
  category: string
}

export const MainPage = () => {
  const dispatch = useAppDispatch()
  const [selectSorting, setSelectSorting] = useState(TypeSortMainPage.tile)
  const [inputText, setInputText] = useState('')

  const { category } = useParams<keyof ParamsMain>() as ParamsMain

  const booksAll = useAppSelector(selectBooksAll)
  const isLoadingBooks = useAppSelector(selectIsLoadingBooks)
  const booksError = useAppSelector(selectErrorBooks)
  const categories = useAppSelector(selectCategories)

  const categoryTranslate = useMemo(
    () => getTranslateCategory(category, categories, booksAll),
    [category, categories, booksAll]
  )

  const [books, setBooks] = useState(booksAll)

  const changeInputText = (value: string) => {
    setInputText(value)
  }

  const changeSorting = (type: TypeSortMainPage) => {
    setSelectSorting(type)
  }

  useEffect(() => {
    setBooks(getFilterBooks(booksAll, inputText, categoryTranslate))
  }, [inputText, booksAll, categoryTranslate])

  useEffect(() => {
    if (booksAll.length === 0) {
      dispatch(getBooksFetch())
    }
  }, [booksAll, dispatch])

  return (
    <section className={styles.mainPage}>
      {booksAll.length && (
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
      )}
      {booksError && (
        <Toast message={booksError} onClose={() => dispatch(getBooksFailure(''))} type='negative' />
      )}
      <OverlayWithPortal type='blur' isOpened={isLoadingBooks}>
        <Loader />
      </OverlayWithPortal>
    </section>
  )
}
