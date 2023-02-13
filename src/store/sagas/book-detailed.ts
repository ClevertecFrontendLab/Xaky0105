import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'

import { axiosInstance } from '../../api/api'
import { BookDetailedType } from '../../types/books'
import {
  getBookDetailedFailure,
  getBookDetailedFetch,
  getBookDetailedSuccess,
} from '../book-detailed/book-detailed.slice'

function* bookDetailedRequestWorker({ payload }: PayloadAction<number>) {
  try {
    const { data }: AxiosResponse<BookDetailedType> = yield call(
      axiosInstance.get,
      `/api/books/${payload}`
    )

    yield put(getBookDetailedSuccess(data))
  } catch {
    yield put(
      getBookDetailedFailure('Что-то пошло не так. Обновите страницу через некоторое время')
    )
  }
}

export function* bookDetailedRequestWatcher() {
  yield takeLatest(getBookDetailedFetch.type, bookDetailedRequestWorker)
}
