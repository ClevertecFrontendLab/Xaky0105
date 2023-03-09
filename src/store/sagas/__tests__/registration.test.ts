import { Dispatch } from 'react'
import { runSaga, Saga } from 'redux-saga'

import { axiosInstance } from '../../../api/api'
import { AuthResponseType } from '../../../types/auth'
import { RegistrationRequestErrors } from '../../../types/errors'
import {
  getRegistrationFailure,
  getRegistrationSuccess,
} from '../../registration/registration.slice'
import { registrationRequestWorker } from '../registration'

describe('registration request', () => {
  const registrationData = {
    username: 'Vlad123',
    password: '123',
    firstName: 'Vlad',
    lastName: 'Ivanov',
    phone: '+375291111111',
    email: 'vlad123.mail.ru',
  }

  const errorMessage400 = RegistrationRequestErrors.registrationLoginAndEmailNotUnique
  const errorMessageOther = RegistrationRequestErrors.registrationSmthError

  let dispatched: Array<Dispatch<AuthResponseType>> = []

  beforeEach(() => {
    dispatched = []
  })

  it('registration success', async () => {
    const registrationMock = jest
      .spyOn(axiosInstance, 'post')
      .mockResolvedValue({ data: registrationData })

    await runSaga(
      {
        getState: () => ({ state: 'test' }),
        dispatch: (action: never) => dispatched.push(action),
      },
      registrationRequestWorker as Saga,
      registrationData
    )
    expect(registrationMock).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getRegistrationSuccess()])
    expect(localStorage.getItem('token')).toBeTruthy()
  })
  it('registration failure status 400', async () => {
    const registrationMock = jest
      .spyOn(axiosInstance, 'post')
      .mockRejectedValue({ response: { status: 400 } })

    await runSaga(
      {
        getState: () => ({ state: 'test' }),
        dispatch: (action: never) => dispatched.push(action),
      },
      registrationRequestWorker as Saga,
      registrationData
    )
    expect(registrationMock).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getRegistrationFailure(errorMessage400)])
  })
  it('registration failure', async () => {
    const registrationMock = jest
      .spyOn(axiosInstance, 'post')
      .mockRejectedValue({ response: { status: undefined } })

    await runSaga(
      {
        getState: () => ({ state: 'test' }),
        dispatch: (action: never) => dispatched.push(action),
      },
      registrationRequestWorker as Saga,
      registrationData
    )
    expect(registrationMock).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getRegistrationFailure(errorMessageOther)])
  })
})
