import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LoginFieldsType, UserType } from '../../types/auth'
import { LoginRequestErrors } from '../../types/errors'

import { LoginState } from './login.types'

let initialUser: UserType | null = null
let storageUserData: string | null = null

if (typeof window !== 'undefined') {
  storageUserData = localStorage.getItem('user')
}

if (storageUserData === 'string') {
  initialUser = JSON.parse(storageUserData)
}

export const initialState: LoginState = {
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
