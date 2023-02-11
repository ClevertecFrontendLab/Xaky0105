import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'

import { booksService } from '@/services/books-services'

import { IBookDetailed } from '@/types/books'

import { getBookFailure, getBookSuccess } from '../book/book.slice'

function* workGetBookFetch(action: PayloadAction<number>) {
  const id = action.payload

  try {
    const book: IBookDetailed = yield call(booksService.getBookDetailed, id)

    yield put(getBookSuccess(book))
  } catch (error: any) {
    yield put(getBookFailure(error.message))
  }
}

function* bookSaga() {
  yield takeEvery('book/getBookFetch', workGetBookFetch)
}

export const book = bookSaga
