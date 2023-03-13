import createSagaMiddleware from 'redux-saga'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { bookDetailedReducer } from './book-detailed/book-detailed.slice'
import { booksReducer } from './books/books.slice'
import { loginReducer } from './login/login.slice'
import { recoveryReducer } from './recovery/recovery.slice'
import { registrationReducer } from './registration/registration.slice'
import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  bookDetailed: bookDetailedReducer,
  books: booksReducer,
  login: loginReducer,
  registration: registrationReducer,
  recovery: recoveryReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
