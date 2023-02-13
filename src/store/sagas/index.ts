import { fork } from 'redux-saga/effects'

import { bookDetailedRequestWatcher } from './book-detailed'
import { booksRequestWatcher } from './books'

export function* rootSaga() {
  yield fork(booksRequestWatcher)
  yield fork(bookDetailedRequestWatcher)
}
