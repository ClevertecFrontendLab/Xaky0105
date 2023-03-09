import { Dispatch } from 'react'
import { runSaga, Saga } from 'redux-saga'

import { axiosInstance } from '../../../api/api'
import { ForgotPasswordRequestType } from '../../../types/auth'
import { getForgotPasswordFailure, getForgotPasswordSuccess } from '../../recovery/recovery.slice'
import { forgotPasswordRequestWorker } from '../forgot-password'

describe('forgot password request', () => {
  let dispatched: Array<Dispatch<ForgotPasswordRequestType>> = []

  const requestData: ForgotPasswordRequestType = {
    email: 'test@mail.ru',
  }

  beforeEach(() => {
    dispatched = []
  })

  it('forgot password success', async () => {
    const forgotPassword = jest
      .spyOn(axiosInstance, 'post')
      .mockResolvedValue({ data: requestData })

    await runSaga(
      {
        getState: () => ({ state: 'test' }),
        dispatch: (action: never) => dispatched.push(action),
      },
      forgotPasswordRequestWorker as Saga,
      requestData
    )

    expect(forgotPassword).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getForgotPasswordSuccess()])
  })
  it('forgot password failure', async () => {
    const forgotPassword = jest.spyOn(axiosInstance, 'post').mockRejectedValue({ message: 'error' })

    await runSaga(
      {
        getState: () => ({ state: 'test' }),
        dispatch: (action: never) => dispatched.push(action),
      },
      forgotPasswordRequestWorker as Saga,
      requestData
    )

    expect(forgotPassword).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getForgotPasswordFailure('error')])
  })
})
