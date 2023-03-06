import { UserType } from '../../../types/auth'
import { LoginRequestErrors } from '../../../types/errors'
import {
  getLoginFailure,
  getLoginRequest,
  getLoginSuccess,
  loginReducer,
  logout,
} from '../login.slice'
import { LoginState } from '../login.types'

const user = {
  username: 'stas777',
  firstName: 'Станислав',
  lastName: 'Иванов',
  id: 1,
} as UserType

describe('login reducers testing', () => {
  let state: LoginState

  test('should clear user data', () => {
    state = {
      user,
      isLoading: false,
      error: null,
    }
    const newState = loginReducer(state, logout)

    expect(newState.user).toBeNull()
  })

  beforeEach(() => {
    state = {
      user: null,
      isLoading: false,
      error: null,
    }
  })
  test('should add user', () => {
    const newState = loginReducer(state, getLoginSuccess(user))

    expect(newState.user).toEqual(user)
    expect(newState.isLoading).toBeFalsy()
    expect(newState.error).toBeNull()
  })

  test('should add user error', () => {
    const newState = loginReducer(state, getLoginFailure(LoginRequestErrors.wrongLoginOrPassword))

    expect(newState.error).toBe(LoginRequestErrors.wrongLoginOrPassword)
    expect(newState.isLoading).toBeFalsy()
    expect(newState.user).toBeNull()
  })
  test('should loader set true', () => {
    const newState = loginReducer(state, getLoginRequest({ identifier: '123', password: '123' }))

    expect(newState.isLoading).toBeTruthy()
    expect(newState.error).toBeNull()
    expect(newState.user).toBeNull()
  })
})
