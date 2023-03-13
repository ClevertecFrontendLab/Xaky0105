import { RootState } from '..'

export const registrationDataMock = {
  username: 'Anton',
  password: 'qwerty123',
  firstName: 'Anton',
  lastName: 'Starosotnikov',
  phone: '+375441231212',
  email: '123@mail.ru',
}

export const mockedState = {
  registration: {
    error: null,
    isLoading: false,
    isSuccess: false,
  },
} as RootState
