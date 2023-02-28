import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import { ApiPath, axiosInstance } from '../../api/api'
import { ForgotPasswordRequestType } from '../../types/auth'
import {
  getForgotPasswordFailure,
  getForgotPasswordRequest,
  getForgotPasswordSuccess,
} from '../recovery/recovery.slice'

function* forgotPasswordRequestWorker({ payload }: PayloadAction<ForgotPasswordRequestType>) {
  try {
    yield call(axiosInstance.post, `${ApiPath.forgotPass}`, {
      ...payload,
    })

    yield put(getForgotPasswordSuccess())
  } catch (err) {
    yield put(getForgotPasswordFailure('error'))
  }
}

export function* forgotPasswordRequestWatcher() {
  yield takeLatest(getForgotPasswordRequest.type, forgotPasswordRequestWorker)
}
