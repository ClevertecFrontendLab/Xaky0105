import { call, put, takeEvery } from 'redux-saga/effects'

import { booksService } from '@/services/books-services'

import { IBook } from '@/types/books'

import { getBooksFailure, getBooksSuccess } from '../books/books.slice'

function* workGetBooksFetch() {
  try {
    const books: IBook[] = yield call(booksService.getBooks)

    yield put(getBooksSuccess(books))
  } catch (error: any) {
    yield put(getBooksFailure(error.message))
  }
}

function* booksSaga() {
  yield takeEvery('books/getBooksFetch', workGetBooksFetch)
}

export const books = booksSaga
