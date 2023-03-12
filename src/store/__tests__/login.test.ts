import { LoginRequestErrors } from '../../types/errors'
import { user } from '../__mocks__/login'
import {
  getLoginFailure,
  getLoginRequest,
  getLoginSuccess,
  initialState,
  loginReducer,
  logout,
} from '../login/login.slice'
import { LoginState } from '../login/login.types'

describe('login reducers testing', () => {
  let state: LoginState

  it('should clear user data', () => {
    state = {
      ...initialState,
      user,
    }
    const newState = loginReducer(state, logout)

    expect(newState.user).toBeNull()
  })

  beforeEach(() => {
    state = initialState
  })
  it('should add user', () => {
    const newState = loginReducer(state, getLoginSuccess(user))

    expect(newState.user).toEqual(user)
    expect(newState.isLoading).toBeFalsy()
    expect(newState.error).toBeNull()
  })

  it('should add user error', () => {
    const newState = loginReducer(state, getLoginFailure(LoginRequestErrors.wrongLoginOrPassword))

    expect(newState.error).toBe(LoginRequestErrors.wrongLoginOrPassword)
    expect(newState.isLoading).toBeFalsy()
    expect(newState.user).toBeNull()
  })
  it('should loader set true', () => {
    const newState = loginReducer(state, getLoginRequest({ identifier: '123', password: '123' }))

    expect(newState.isLoading).toBeTruthy()
    expect(newState.error).toBeNull()
    expect(newState.user).toBeNull()
  })
})
