import { all, call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import { axiosInstance } from '../../api/api'
import { BookType } from '../../types/books'
import { CategoryType } from '../../types/categories'
import {
  getBooksFailure,
  getBooksFetch,
  getBooksSuccess,
  getCategoriesSuccess,
} from '../books/books.slice'

function* booksRequestWorker() {
  try {
    const [categories, books]: [AxiosResponse<CategoryType[]>, AxiosResponse<BookType[]>] =
      yield all([call(axiosInstance.get, '/api/categories'), call(axiosInstance.get, '/api/books')])

    yield put(getCategoriesSuccess(categories.data))
    yield put(getBooksSuccess(books.data))
  } catch {
    yield put(getBooksFailure('Что-то пошло не так. Обновите страницу через некоторое время'))
  }
}

export function* booksRequestWatcher() {
  yield takeLatest(getBooksFetch.type, booksRequestWorker)
}
