import { Dispatch } from 'react'
import { runSaga, RunSagaOptions, Saga } from 'redux-saga'
import { takeLatest } from 'redux-saga/effects'

import { axiosInstance } from '../../../api/api'
import { ForgotPasswordRequestType } from '../../../types/auth'
import { AppDispatch, RootState } from '../..'
import { forgotDataMock, mockedState } from '../../__mocks__/recovery'
import { recoverySelector } from '../../recovery/recovery.selector'
import {
  getForgotPasswordFailure,
  getForgotPasswordRequest,
  getForgotPasswordSuccess,
} from '../../recovery/recovery.slice'
import { forgotPasswordRequestWatcher, forgotPasswordRequestWorker } from '../forgot-password'

describe('forgot password saga', () => {
  const mainGen = forgotPasswordRequestWatcher()
  const expected = takeLatest(getForgotPasswordRequest.type, forgotPasswordRequestWorker)
  let dispatchedActions: Array<Dispatch<ForgotPasswordRequestType>> = []
  let fakeStore: RunSagaOptions<AppDispatch, RootState>

  beforeEach(() => {
    dispatchedActions = []
    fakeStore = {
      getState: () => mockedState,
      dispatch: (action: never) => dispatchedActions.push(action),
    }
  })

  it('should fire on getForgotPasswordRequest', () => {
    const actual = mainGen.next().value

    expect(actual).toEqual(expected)
  })

  it('selector should return the desired state', () => {
    const res = recoverySelector(mockedState)

    expect(res).toEqual(mockedState.recovery)
  })

  it('forgot password success', async () => {
    const getForgotPassword = jest
      .spyOn(axiosInstance, 'post')
      .mockResolvedValue({ data: forgotDataMock })

    await runSaga(fakeStore, forgotPasswordRequestWorker as Saga, forgotDataMock)

    expect(getForgotPassword).toHaveBeenCalledTimes(1)
    expect(dispatchedActions).toEqual([getForgotPasswordSuccess()])
  })
  it('forgot password failure', async () => {
    const getForgotPassword = jest
      .spyOn(axiosInstance, 'post')
      .mockRejectedValue({ message: 'error' })

    await runSaga(fakeStore, forgotPasswordRequestWorker as Saga, forgotDataMock)

    expect(getForgotPassword).toHaveBeenCalledTimes(1)
    expect(dispatchedActions).toEqual([getForgotPasswordFailure('error')])
  })
})
