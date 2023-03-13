import {
  registerStepOneSchema,
  registerStepThreeSchema,
  registerStepTwoSchema,
} from '../validation/scheme'

export const btnRegistrationMessage = (registrationStep: number) => {
  switch (registrationStep) {
    case 1:
      return 'Следующий шаг'
    case 2:
      return 'Последний шаг'
    case 3:
      return 'Зарегистрироваться'
    default:
      return 'Следующий шаг'
  }
}

export const selectRegistrationSchema = (registrationStep: number) => {
  switch (registrationStep) {
    case 1:
      return registerStepOneSchema
    case 2:
      return registerStepTwoSchema
    case 3:
      return registerStepThreeSchema
    default:
      return registerStepOneSchema
  }
}
