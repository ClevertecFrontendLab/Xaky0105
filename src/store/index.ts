import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { bookReducer } from './book/book.slice'
import { booksReducer } from './books/books.slice'
import { categoriesReducer } from './categories/categories.slice'
import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  book: bookReducer,
  books: booksReducer,
  categories: categoriesReducer,
})

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
