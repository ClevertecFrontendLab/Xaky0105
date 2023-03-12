import { ForgotPasswordRequestType, ResetPasswordRequestType } from '../../types/auth'
import { RootState } from '..'

export const recoveryDataMock: ForgotPasswordRequestType = { email: '123@mail.ru' }

export const resetDataMock: ResetPasswordRequestType = {
  code: 'qwerty213131',
  password: '123',
  passwordConfirmation: '123',
}

export const forgotDataMock: ForgotPasswordRequestType = {
  email: 'test@mail.ru',
}

export const mockedState = {
  recovery: {
    error: null,
    isForgotSuccess: false,
    isResetSuccess: false,
    isLoading: false,
  },
} as RootState
