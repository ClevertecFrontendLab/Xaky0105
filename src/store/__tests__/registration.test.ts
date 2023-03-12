import { RegistrationRequestErrors } from '../../types/errors'
import { registrationDataMock } from '../__mocks__/registration'
import {
  clearRegistrationData,
  getRegistrationFailure,
  getRegistrationRequest,
  getRegistrationSuccess,
  initialState,
  registrationReducer,
} from '../registration/registration.slice'
import { RegistrationState } from '../registration/registration.types'

describe('registration reducers testing', () => {
  let state: RegistrationState

  beforeEach(() => {
    state = initialState
  })

  it('registration request', () => {
    const { error, isLoading, isSuccess } = registrationReducer(
      state,
      getRegistrationRequest(registrationDataMock)
    )

    expect(error).toBeNull()
    expect(isLoading).toBeTruthy()
    expect(isSuccess).toBeFalsy()
  })
  it('registration success', () => {
    const { isLoading, isSuccess } = registrationReducer(state, getRegistrationSuccess())

    expect(isLoading).toBeFalsy()
    expect(isSuccess).toBeTruthy()
  })
  it('clear registration data', () => {
    const { error, isSuccess } = registrationReducer(state, clearRegistrationData())

    expect(error).toBeNull()
    expect(isSuccess).toBeFalsy()
  })
  it('registration failure', () => {
    const { error, isLoading } = registrationReducer(
      state,
      getRegistrationFailure(RegistrationRequestErrors.registrationSmthError)
    )

    expect(error).toBe(RegistrationRequestErrors.registrationSmthError)
    expect(isLoading).toBeFalsy()
  })
})
