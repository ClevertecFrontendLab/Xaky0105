export type RegistrationFieldsType = {
  username: string
  password: string
  firstName: string
  lastName: string
  phone: string
  email: string
}

export type RegistrationStepOneFieldsType = Pick<RegistrationFieldsType, 'username' | 'password'>
export type RegistrationStepTwoFieldsType = Pick<RegistrationFieldsType, 'firstName' | 'lastName'>
export type RegistrationStepThreeFieldsType = Pick<RegistrationFieldsType, 'phone' | 'email'>

export type LoginFieldsType = {
  identifier: string
  password: string
}

type PasswordType = {
  password: string
  passwordConfirmation: string
}

export type ResetPasswordRequestType = PasswordType & { code: string }

export type RecoveryFieldType = PasswordType & { email: string }

export type ForgotPasswordRequestType = Pick<RecoveryFieldType, 'email'>

export type AuthResponseType = {
  jwt: string
  user: UserType
}

export type UserType = {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: false
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  phone: string
}
