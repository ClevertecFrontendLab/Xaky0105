import { fork } from 'redux-saga/effects'

import { bookDetailedRequestWatcher } from './book-detailed'
import { booksRequestWatcher } from './books'
import { booksWithCategoryRequestWatcher } from './books-with-category'
import { categoriesRequestWatcher } from './categories'
import { forgotPasswordRequestWatcher } from './forgot-password'
import { loginRequestWatcher } from './login'
import { registrationRequestWatcher } from './registration'
import { resetPasswordRequestWatcher } from './reset-password'

export function* rootSaga() {
  yield fork(booksWithCategoryRequestWatcher)
  yield fork(bookDetailedRequestWatcher)
  yield fork(booksRequestWatcher)
  yield fork(registrationRequestWatcher)
  yield fork(loginRequestWatcher)
  yield fork(forgotPasswordRequestWatcher)
  yield fork(resetPasswordRequestWatcher)
  yield fork(categoriesRequestWatcher)
}
