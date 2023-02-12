import { call, put, takeEvery } from 'redux-saga/effects'

import { booksService } from '@/services/books-services'

import { BookType } from '@/types/books'

import { getBooksFailure, getBooksSuccess } from '../books/books.slice'

function* workGetBooksFetch() {
  try {
    const books: BookType[] = yield call(booksService.getBooks)

    yield put(getBooksSuccess(books))
  } catch {
    yield put(getBooksFailure('Что-то пошло не так. Обновите страницу через некоторое время'))
  }
}

function* booksSaga() {
  yield takeEvery('books/getBooksFetch', workGetBooksFetch)
}

export const books = booksSaga
