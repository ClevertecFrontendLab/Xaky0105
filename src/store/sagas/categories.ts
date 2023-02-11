import { call, put, takeEvery } from 'redux-saga/effects'

import { categoriesService } from '@/services/categories-services'

import { ICategory } from '@/types/categories'

import { getCategoriesFailure, getCategoriesSuccess } from '../categories/categories.slice'

function* workGetCategoriesFetch() {
  try {
    const categories: ICategory[] = yield call(categoriesService.getCategories)

    yield put(getCategoriesSuccess(categories))
  } catch (error: any) {
    yield put(getCategoriesFailure(error.message))
  }
}

function* categoriesSaga() {
  yield takeEvery('categories/getCategoriesFetch', workGetCategoriesFetch)
}

export const categories = categoriesSaga
