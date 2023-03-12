import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ForgotPasswordRequestType, ResetPasswordRequestType } from '../../types/auth'
import { RecoveryRequestErrors } from '../../types/errors'

import { RecoveryState } from './recovery.types'

export const initialState: RecoveryState = {
  isLoading: false,
  isForgotSuccess: false,
  isResetSuccess: false,
  error: null,
}

export const recoverySlice = createSlice({
  name: 'recovery',
  initialState,
  reducers: {
    getForgotPasswordRequest: (state, _: PayloadAction<ForgotPasswordRequestType>) => {
      state.error = null
      state.isForgotSuccess = false
      state.isResetSuccess = false
      state.isLoading = true
    },
    getResetPasswordRequest: (state, _: PayloadAction<ResetPasswordRequestType>) => {
      state.error = null
      state.isForgotSuccess = false
      state.isResetSuccess = false
      state.isLoading = true
    },
    getForgotPasswordSuccess: state => {
      state.isLoading = false
      state.isResetSuccess = false
      state.isForgotSuccess = true
    },
    getResetPasswordSuccess: state => {
      state.isLoading = false
      state.isForgotSuccess = false
      state.isResetSuccess = true
    },
    getForgotPasswordFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    getResetPasswordFailure: (state, action: PayloadAction<RecoveryRequestErrors>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const {
  getForgotPasswordRequest,
  getForgotPasswordSuccess,
  getResetPasswordRequest,
  getResetPasswordSuccess,
  getForgotPasswordFailure,
  getResetPasswordFailure,
} = recoverySlice.actions

export const recoveryReducer = recoverySlice.reducer
