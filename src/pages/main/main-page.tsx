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
import { DataTestId, ToastVariant, TypeSortMainPage } from '../../types/other'
import { getFilterBooks, sortBooksByRating } from '../../utils/filter'

import styles from './main-page.module.scss'

export const MainPage = () => {
  const dispatch = useAppDispatch()
  const [selectSorting, setSelectSorting] = useState(TypeSortMainPage.tile)
  const [isSortBooksDescendingOrder, setIsSortBooksDescendingOrder] = useState(true)
  const [inputText, setInputText] = useState('')

  const { category } = useParams()
  const location = useLocation()
  const state = location.state && location.state

  const { books: booksAll, error, isLoading, categories } = useAppSelector(booksSelector)

  const [books, setBooks] = useState(booksAll)

  const changeInputText = (value: string) => {
    setInputText(value)
  }

  const toggleSortBooksByRating = () => {
    setIsSortBooksDescendingOrder(!isSortBooksDescendingOrder)
  }

  const changeSorting = (type: TypeSortMainPage) => {
    setSelectSorting(type)
  }

  useEffect(() => {
    if (booksAll && category) {
      setBooks(getFilterBooks(booksAll, inputText, categories, category))
    }
  }, [inputText, booksAll, categories, category])

  const sortedBooksByRating = useMemo(
    () => books && sortBooksByRating(books, isSortBooksDescendingOrder),
    [books, isSortBooksDescendingOrder]
  )

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
            isSortBooksDescendingOrder={isSortBooksDescendingOrder}
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
