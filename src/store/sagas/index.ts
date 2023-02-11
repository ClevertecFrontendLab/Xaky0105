import { all, spawn } from 'redux-saga/effects'

import { book } from './book'
import { books } from './books'
import { categories } from './categories'

// eslint-disable-next-line import/no-default-export
export default function* rootSaga() {
  const sagas = [books, categories, book]

  yield all(sagas.map(s => spawn(s)))
}
