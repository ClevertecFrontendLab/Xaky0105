import { RegistrationRequestErrors } from '../../types/errors'
import {
  clearRegistrationData,
  getRegistrationFailure,
  getRegistrationRequest,
  getRegistrationSuccess,
  registrationReducer,
} from '../registration/registration.slice'
import { RegistrationState } from '../registration/registration.types'

describe('registration reducers testing', () => {
  let state: RegistrationState

  beforeEach(() => {
    state = {
      isLoading: false,
      isSuccess: false,
      error: null,
    }
  })

  it('registration request', () => {
    const requestData = {
      username: 'Anton',
      password: 'qwerty123',
      firstName: 'Anton',
      lastName: 'Starosotnikov',
      phone: '+375441231212',
      email: '123@mail.ru',
    }
    const { error, isLoading, isSuccess } = registrationReducer(
      state,
      getRegistrationRequest(requestData)
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
