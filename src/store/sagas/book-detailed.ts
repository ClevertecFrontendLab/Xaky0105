import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'

import { ApiPath, axiosInstance } from '../../api/api'
import { BookDetailedType } from '../../types/books'
import { RequestErrors } from '../../types/errors'
import {
  getBookDetailedFailure,
  getBookDetailedRequest,
  getBookDetailedSuccess,
} from '../book-detailed/book-detailed.slice'

export function* bookDetailedRequestWorker({ payload }: PayloadAction<number>) {
  try {
    const { data }: AxiosResponse<BookDetailedType> = yield call(
      axiosInstance.get,
      `${ApiPath.books}/${payload}`
    )

    yield put(getBookDetailedSuccess(data))
  } catch {
    yield put(getBookDetailedFailure(RequestErrors.smthWrong))
  }
}

export function* bookDetailedRequestWatcher() {
  yield takeLatest(getBookDetailedRequest.type, bookDetailedRequestWorker)
}
