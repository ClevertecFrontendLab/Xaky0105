import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import { axiosInstance } from '../../api/api'
import { CategoryType } from '../../types/categories'
import {
  getCategoriesFailure,
  getCategoriesFetch,
  getCategoriesSuccess,
} from '../categories/categories.slice'

function* categoriesRequestWorker() {
  try {
    const { data }: AxiosResponse<CategoryType[]> = yield call(axiosInstance.get, '/api/categories')

    yield put(getCategoriesSuccess(data))
  } catch {
    yield put(getCategoriesFailure('Что-то пошло не так. Обновите страницу через некоторое время'))
  }
}

export function* categoriesRequestWatcher() {
  yield takeLatest(getCategoriesFetch.type, categoriesRequestWorker)
}
