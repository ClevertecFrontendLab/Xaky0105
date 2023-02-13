import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

import { BookDetailedType } from '@/types/books'

import { axiosInstance } from '@/api/api'

import { getBookFailure, getBookFetch, getBookSuccess } from '../book/book.slice'

function* bookRequestWorker({ payload }: PayloadAction<number>) {
  try {
    const { data }: AxiosResponse<BookDetailedType> = yield call(
      axiosInstance.get,
      `/api/books/${payload}`
    )

    yield put(getBookSuccess(data))
  } catch {
    yield put(getBookFailure('Что-то пошло не так. Обновите страницу через некоторое время'))
  }
}

export function* bookRequestWatcher() {
  yield takeLatest(getBookFetch.type, bookRequestWorker)
}
