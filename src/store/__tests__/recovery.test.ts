import { ForgotPasswordRequestType, ResetPasswordRequestType } from '../../types/auth'
import { RecoveryRequestErrors } from '../../types/errors'
import {
  getForgotPasswordFailure,
  getForgotPasswordRequest,
  getForgotPasswordSuccess,
  getResetPasswordRequest,
  getResetPasswordSuccess,
  recoveryReducer,
} from '../recovery/recovery.slice'
import { RecoveryState } from '../recovery/recovery.types'

describe('recovery reducers testing', () => {
  let state: RecoveryState

  beforeEach(() => {
    state = {
      isLoading: false,
      isForgotSuccess: false,
      isResetSuccess: false,
      error: null,
    }
  })
  it('forgot password request', () => {
    const requestData: ForgotPasswordRequestType = { email: '123@mail.ru' }
    const { error, isForgotSuccess, isLoading, isResetSuccess } = recoveryReducer(
      state,
      getForgotPasswordRequest(requestData)
    )

    expect(error).toBeNull()
    expect(isForgotSuccess).toBeFalsy()
    expect(isLoading).toBeTruthy()
    expect(isResetSuccess).toBeFalsy()
  })
  it('reset password request', () => {
    const requestData: ResetPasswordRequestType = {
      code: 'qwerty213131',
      password: '123',
      passwordConfirmation: '123',
    }
    const { error, isForgotSuccess, isLoading, isResetSuccess } = recoveryReducer(
      state,
      getResetPasswordRequest(requestData)
    )

    expect(error).toBeNull()
    expect(isForgotSuccess).toBeFalsy()
    expect(isLoading).toBeTruthy()
    expect(isResetSuccess).toBeFalsy()
  })
  it('forgot password success', () => {
    const { isResetSuccess, isForgotSuccess, isLoading } = recoveryReducer(
      state,
      getForgotPasswordSuccess()
    )

    expect(isLoading).toBeFalsy()
    expect(isForgotSuccess).toBeTruthy()
    expect(isResetSuccess).toBeFalsy()
  })
  it('reset password success', () => {
    const { isResetSuccess, isForgotSuccess, isLoading } = recoveryReducer(
      state,
      getResetPasswordSuccess()
    )

    expect(isLoading).toBeFalsy()
    expect(isForgotSuccess).toBeFalsy()
    expect(isResetSuccess).toBeTruthy()
  })
  it('forgot password failure', () => {
    const { isLoading, error } = recoveryReducer(state, getForgotPasswordFailure('Ошибка'))

    expect(isLoading).toBeFalsy()
    expect(error).toBe('Ошибка')
  })
  it('reset password failure', () => {
    const requestData: RecoveryRequestErrors = RecoveryRequestErrors.requestSmthError
    const { isLoading, error } = recoveryReducer(state, getForgotPasswordFailure(requestData))

    expect(isLoading).toBeFalsy()
    expect(error).toBe(requestData)
  })
})
