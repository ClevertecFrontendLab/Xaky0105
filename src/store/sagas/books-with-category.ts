import { all, call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import { ApiPath, axiosInstance } from '../../api/api'
import { BookType } from '../../types/books'
import { CategoryType } from '../../types/categories'
import { RequestErrors } from '../../types/other'
import {
  getBooksFailure,
  getBooksSuccess,
  getBooksWithCategoryRequest,
  getCategoriesSuccess,
} from '../books/books.slice'

function* booksWithCategoryRequestWorker() {
  try {
    const [categories, books]: [AxiosResponse<CategoryType[]>, AxiosResponse<BookType[]>] =
      yield all([
        call(axiosInstance.get, ApiPath.categories),
        call(axiosInstance.get, ApiPath.books),
      ])

    yield put(getCategoriesSuccess(categories.data))
    yield put(getBooksSuccess(books.data))
  } catch {
    yield put(getBooksFailure(RequestErrors.smthWrong))
  }
}

export function* booksWithCategoryRequestWatcher() {
  yield takeLatest(getBooksWithCategoryRequest.type, booksWithCategoryRequestWorker)
}
