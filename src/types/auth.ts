export type RegistrationFieldsType = {
  username: string
  password: string
  firstName: string
  lastName: string
  phone: string
  email: string
}

export type RegistrationStepOneFieldsType = {
  username: string
  password: string
}
export type RegistrationStepTwoFieldsType = {
  firstName: string
  lastName: string
}
export type RegistrationStepThreeFieldsType = {
  phone: string
  email: string
}

export type LoginFieldsType = {
  identifier: string
  password: string
}

export type ResetPasswordRequestType = {
  password: string
  passwordConfirmation: string
  code: string
}

export type RecoveryFieldType = {
  email: string
  password: string
  passwordConfirmation: string
}

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
