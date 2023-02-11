import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'

import { bookReducer } from './book/book.slice'
import { booksReducer } from './books/books.slice'
import { categoriesReducer } from './categories/categories.slice'
import rootSaga from './sagas'

const saga = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    book: bookReducer,
    books: booksReducer,
    categories: categoriesReducer,
  },
  middleware: [saga],
})

saga.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
