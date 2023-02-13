import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

import { BookType } from '@/types/books'

import { axiosInstance } from '@/api/api'

import { getBooksFailure, getBooksFetch, getBooksSuccess } from '../books/books.slice'

function* booksRequestWorker() {
  try {
    const { data }: AxiosResponse<BookType[]> = yield call(axiosInstance.get, '/api/books')

    yield put(getBooksSuccess(data))
  } catch {
    yield put(getBooksFailure('Что-то пошло не так. Обновите страницу через некоторое время'))
  }
}

export function* booksRequestWatcher() {
  yield takeLatest(getBooksFetch.type, booksRequestWorker)
}
