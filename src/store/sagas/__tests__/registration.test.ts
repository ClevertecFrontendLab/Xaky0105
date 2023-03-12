import { Dispatch } from 'react'
import { runSaga, RunSagaOptions, Saga } from 'redux-saga'
import { takeLatest } from 'redux-saga/effects'

import { axiosInstance } from '../../../api/api'
import { AuthResponseType } from '../../../types/auth'
import { RegistrationRequestErrors } from '../../../types/errors'
import { AppDispatch, RootState } from '../..'
import { mockedState, registrationDataMock } from '../../__mocks__/registration'
import { registrationSelector } from '../../registration/registration.selector'
import {
  getRegistrationFailure,
  getRegistrationRequest,
  getRegistrationSuccess,
} from '../../registration/registration.slice'
import { registrationRequestWatcher, registrationRequestWorker } from '../registration'

describe('registration saga', () => {
  const errorMessage400 = RegistrationRequestErrors.registrationLoginAndEmailNotUnique
  const errorMessageOther = RegistrationRequestErrors.registrationSmthError

  const mainGen = registrationRequestWatcher()
  const expected = takeLatest(getRegistrationRequest.type, registrationRequestWorker)
  let dispatchedActions: Array<Dispatch<AuthResponseType>> = []
  let fakeStore: RunSagaOptions<AppDispatch, RootState>

  beforeEach(() => {
    dispatchedActions = []
    fakeStore = {
      getState: () => mockedState,
      dispatch: (action: never) => dispatchedActions.push(action),
    }
  })

  it('should fire on getRegistrationRequest', () => {
    const actual = mainGen.next().value

    expect(actual).toEqual(expected)
  })

  it('selector should return the desired state', () => {
    const res = registrationSelector(mockedState)

    expect(res).toEqual(mockedState.registration)
  })

  it('registration success', async () => {
    const registrationMock = jest
      .spyOn(axiosInstance, 'post')
      .mockResolvedValue({ data: registrationDataMock })

    await runSaga(fakeStore, registrationRequestWorker as Saga, registrationDataMock)
    expect(registrationMock).toHaveBeenCalledTimes(1)
    expect(dispatchedActions).toEqual([getRegistrationSuccess()])
    expect(localStorage.getItem('token')).toBeTruthy()
  })
  it('registration failure status 400', async () => {
    const registrationMock = jest
      .spyOn(axiosInstance, 'post')
      .mockRejectedValue({ response: { status: 400 } })

    await runSaga(fakeStore, registrationRequestWorker as Saga, registrationDataMock)
    expect(registrationMock).toHaveBeenCalledTimes(1)
    expect(dispatchedActions).toEqual([getRegistrationFailure(errorMessage400)])
  })
  it('registration failure', async () => {
    const registrationMock = jest
      .spyOn(axiosInstance, 'post')
      .mockRejectedValue({ response: { status: undefined } })

    await runSaga(fakeStore, registrationRequestWorker as Saga, registrationDataMock)
    expect(registrationMock).toHaveBeenCalledTimes(1)
    expect(dispatchedActions).toEqual([getRegistrationFailure(errorMessageOther)])
  })
})
