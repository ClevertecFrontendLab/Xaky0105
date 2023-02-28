import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import { ApiPath, axiosInstance } from '../../api/api'
import { ResetPasswordRequestType } from '../../types/auth'
import { RecoveryRequestErrors } from '../../types/errors'
import {
  getResetPasswordFailure,
  getResetPasswordRequest,
  getResetPasswordSuccess,
} from '../recovery/recovery.slice'

function* resetPasswordRequestWorker({ payload }: PayloadAction<ResetPasswordRequestType>) {
  try {
    yield call(axiosInstance.post, `${ApiPath.resetPass}`, {
      ...payload,
    })

    yield put(getResetPasswordSuccess())
  } catch {
    yield put(getResetPasswordFailure(RecoveryRequestErrors.requestSmthError))
  }
}

export function* resetPasswordRequestWatcher() {
  yield takeLatest(getResetPasswordRequest.type, resetPasswordRequestWorker)
}
