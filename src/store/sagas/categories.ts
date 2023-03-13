import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import { ApiPath, axiosInstance } from '../../api/api'
import { CategoryType } from '../../types/categories'
import { RequestErrors } from '../../types/errors'
import {
  getCategoriesFailure,
  getCategoriesRequest,
  getCategoriesSuccess,
} from '../books/books.slice'

export function* categoriesRequestWorker() {
  try {
    const { data }: AxiosResponse<CategoryType[]> = yield call(
      axiosInstance.get,
      ApiPath.categories
    )

    yield put(getCategoriesSuccess(data))
  } catch {
    yield put(getCategoriesFailure(RequestErrors.smthWrong))
  }
}

export function* categoriesRequestWatcher() {
  yield takeLatest(getCategoriesRequest.type, categoriesRequestWorker)
}
