import { all } from 'redux-saga/effects'

import { bookRequestWatcher } from './book'
import { booksRequestWatcher } from './books'
import { categoriesRequestWatcher } from './categories'

export function* rootSaga() {
  yield all([bookRequestWatcher(), booksRequestWatcher(), categoriesRequestWatcher()])
}
