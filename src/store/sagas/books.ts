import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import { ApiPath, axiosInstance } from '../../api/api'
import { BookType } from '../../types/books'
import { RequestErrors } from '../../types/errors'
import { getBooksFailure, getBooksRequest, getBooksSuccess } from '../books/books.slice'

export function* booksRequestWorker() {
  try {
    const { data }: AxiosResponse<BookType[]> = yield call(axiosInstance.get, ApiPath.books)

    yield put(getBooksSuccess(data))
  } catch {
    yield put(getBooksFailure(RequestErrors.smthWrong))
  }
}

export function* booksRequestWatcher() {
  yield takeLatest(getBooksRequest.type, booksRequestWorker)
}
