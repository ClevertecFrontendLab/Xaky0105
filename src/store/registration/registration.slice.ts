import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RegistrationFieldsType } from '../../types/auth'
import { RegistrationRequestErrors } from '../../types/errors'

import { RegistrationState } from './registration.types'

export const initialState: RegistrationState = {
  isLoading: false,
  isSuccess: false,
  error: null,
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    getRegistrationRequest: (state, _: PayloadAction<RegistrationFieldsType>) => {
      state.isSuccess = false
      state.error = null
      state.isLoading = true
    },
    getRegistrationSuccess: state => {
      state.isLoading = false
      state.isSuccess = true
    },
    getRegistrationFailure: (state, action: PayloadAction<RegistrationRequestErrors>) => {
      state.isLoading = false
      state.error = action.payload
    },
    clearRegistrationData: state => {
      state.error = null
      state.isSuccess = false
    },
  },
})

export const {
  getRegistrationRequest,
  getRegistrationSuccess,
  getRegistrationFailure,
  clearRegistrationData,
} = registrationSlice.actions

export const registrationReducer = registrationSlice.reducer
