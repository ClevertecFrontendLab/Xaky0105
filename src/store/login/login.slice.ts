import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LoginFieldsType, UserType } from '../../types/auth'
import { LoginRequestErrors } from '../../types/errors'

import { LoginState } from './login.types'

const storageUserData = localStorage.getItem('user')

let initialUser = null

if (storageUserData !== null) {
  initialUser = JSON.parse(storageUserData)
}

const initialState: LoginState = {
  user: initialUser,
  isLoading: false,
  error: null,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getLoginRequest: (state, _: PayloadAction<LoginFieldsType>) => {
      state.user = null
      state.error = null
      state.isLoading = true
    },
    getLoginSuccess: (state, action: PayloadAction<UserType>) => {
      state.isLoading = false
      state.user = action.payload
    },
    getLoginFailure: (state, action: PayloadAction<LoginRequestErrors>) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: state => {
      state.user = null
      state.isLoading = false
      state.error = null
    },
  },
})

export const { logout, getLoginFailure, getLoginRequest, getLoginSuccess } = loginSlice.actions

export const loginReducer = loginSlice.reducer
