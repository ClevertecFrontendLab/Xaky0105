import createSagaMiddleware from 'redux-saga'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { bookReducer } from './book-detailed/book-detailed.slice'
import { booksReducer } from './books/books.slice'
import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  book: bookReducer,
  books: booksReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
