import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'

import { ApiPath, axiosInstance } from '../../api/api'
import { AuthResponseType, RegistrationFieldsType } from '../../types/auth'
import { RegistrationRequestErrors } from '../../types/errors'
import {
  getRegistrationFailure,
  getRegistrationRequest,
  getRegistrationSuccess,
} from '../registration/registration.slice'

function* registrationRequestWorker({ payload }: PayloadAction<RegistrationFieldsType>) {
  try {
    const { data }: AxiosResponse<AuthResponseType> = yield call(
      axiosInstance.post,
      `${ApiPath.registration}`,
      {
        ...payload,
      }
    )

    yield put(getRegistrationSuccess())
    yield localStorage.setItem('token', data.jwt)
  } catch (err) {
    const { response } = err as AxiosError

    if (response?.status === 400) {
      yield put(
        getRegistrationFailure(RegistrationRequestErrors.registrationLoginAndEmailNotUnique)
      )
    } else {
      yield put(getRegistrationFailure(RegistrationRequestErrors.registrationSmthError))
    }
  }
}

export function* registrationRequestWatcher() {
  yield takeLatest(getRegistrationRequest.type, registrationRequestWorker)
}
