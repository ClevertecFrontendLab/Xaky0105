import { fork } from 'redux-saga/effects'

import { bookDetailedRequestWatcher } from './book-detailed'
import { booksRequestWatcher } from './books'
import { booksWithCategoryRequestWatcher } from './books-with-category'

export function* rootSaga() {
  yield fork(booksWithCategoryRequestWatcher)
  yield fork(bookDetailedRequestWatcher)
  yield fork(booksRequestWatcher)
}
