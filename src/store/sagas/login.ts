import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'

import { ApiPath, axiosInstance } from '../../api/api'
import { AuthResponseType, LoginFieldsType } from '../../types/auth'
import { LoginRequestErrors } from '../../types/errors'
import { getLoginFailure, getLoginRequest, getLoginSuccess } from '../login/login.slice'

function* loginRequestWorker({ payload }: PayloadAction<LoginFieldsType>) {
  try {
    const { data }: AxiosResponse<AuthResponseType> = yield call(
      axiosInstance.post,
      `${ApiPath.auth}`,
      {
        ...payload,
      }
    )

    yield put(getLoginSuccess(data.user))
    yield localStorage.setItem('user', JSON.stringify(data.user))
    yield localStorage.setItem('token', data.jwt)
  } catch (err) {
    const { response } = err as AxiosError

    if (response?.status === 400) {
      yield put(getLoginFailure(LoginRequestErrors.wrongLoginOrPassword))
    } else {
      yield put(getLoginFailure(LoginRequestErrors.loginSmthError))
    }
  }
}

export function* loginRequestWatcher() {
  yield takeLatest(getLoginRequest.type, loginRequestWorker)
}
