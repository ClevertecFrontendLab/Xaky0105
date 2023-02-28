import { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { CardList } from '../../components/card-list'
import { Filter } from '../../components/filter'
import { Loader } from '../../components/loader'
import { OverlayWithPortal } from '../../components/overlay-with-portal'
import { Toast } from '../../components/ui/toast'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { booksSelector } from '../../store/books/books.selector'
import { getBooksFailure, getBooksWithCategoryRequest } from '../../store/books/books.slice'
import { BookSortingByRating } from '../../types/books'
import { DataTestId, ToastVariant, TypeSortMainPage } from '../../types/other'
import { getFilterBooks, sortBooksByRating } from '../../utils/filter'

import styles from './main-page.module.scss'

export const MainPage = () => {
  const dispatch = useAppDispatch()
  const [selectSorting, setSelectSorting] = useState(TypeSortMainPage.tile)
  const [selectSortingBooksByRating, setSelectSortingBooksByRating] = useState(
    BookSortingByRating.Descending
  )
  const [inputText, setInputText] = useState('')

  const { category } = useParams()
  const { state } = useLocation()

  const { books: booksAll, error, isLoading, categories } = useAppSelector(booksSelector)

  const [books, setBooks] = useState(booksAll)

  const changeInputText = (value: string) => {
    setInputText(value)
  }

  const toggleSortBooksByRating = () => {
    if (selectSortingBooksByRating === BookSortingByRating.Descending) {
      setSelectSortingBooksByRating(BookSortingByRating.Ascending)
    } else {
      setSelectSortingBooksByRating(BookSortingByRating.Descending)
    }
  }

  const changeSorting = (type: TypeSortMainPage) => {
    setSelectSorting(type)
  }

  useEffect(() => {
    if (booksAll && category) {
      setBooks(getFilterBooks(booksAll, inputText, categories, category))
    }
  }, [inputText, booksAll, categories, category])

  const sortedBooksByRating = useMemo(() => {
    if (books) {
      return sortBooksByRating(books, selectSortingBooksByRating)
    }

    return null
  }, [books, selectSortingBooksByRating])

  useEffect(() => {
    if (!categories) {
      dispatch(getBooksWithCategoryRequest())
    }
  }, [dispatch, categories])

  return (
    <section className={styles.mainPage}>
      {booksAll && (
        <div className={styles.mainContent}>
          <Filter
            changeSorting={changeSorting}
            selectSorting={selectSorting}
            inputText={inputText}
            changeInputText={changeInputText}
            toggleSortBooksByRating={toggleSortBooksByRating}
            selectSortingBooksByRating={selectSortingBooksByRating}
          />
          {sortedBooksByRating?.length ? (
            <CardList
              selectSorting={selectSorting}
              cardsData={sortedBooksByRating}
              inputText={inputText}
            />
          ) : (
            <div className={styles.notFound}>
              {state && state.quantityBooks === 0 ? (
                <p data-test-id={DataTestId.EmptyCategory}>В этой категории книг ещё нет</p>
              ) : (
                <p data-test-id={DataTestId.SearchResultNotFound}>По запросу ничего не найдено</p>
              )}
            </div>
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
