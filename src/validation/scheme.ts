import { lazy, object, ref, string } from 'yup'

import { ErrorsMessages } from '../types/errors'

import { Regex } from './regex'

export const registerStepOneSchema = object({
  username: string()
    .required(ErrorsMessages.required)
    .matches(Regex.loginLetter, 'латинский алфавит')
    .matches(Regex.loginNumber, 'цифры'),
  password: string()
    .required(ErrorsMessages.required)
    .matches(Regex.minEightSymbol, ErrorsMessages.atLeastEightCharacters)
    .matches(Regex.passwordUpperLetter, { message: ErrorsMessages.withUpperLater })
    .matches(Regex.passwordMinOneNum, { message: ErrorsMessages.withNumber }),
})

export const registerStepTwoSchema = object({
  firstName: string().required(ErrorsMessages.required),
  lastName: string().required(ErrorsMessages.required),
})

export const registerStepThreeSchema = object({
  phone: string()
    .required(ErrorsMessages.required)
    .matches(Regex.phone, { message: 'В формате +375 (xx) xxx-xx-xx' }),
  email: string()
    .required(ErrorsMessages.required)
    .matches(Regex.email, 'Введите корректный e-mail'),
})

export const loginSchema = object({
  identifier: string().required(ErrorsMessages.required),
  password: string().required(ErrorsMessages.required),
})

export const forgotPasswordSchema = object({
  email: string()
    .required(ErrorsMessages.required)
    .matches(Regex.email, 'Введите корректный e-mail'),
})
export const resetPasswordSchema = object({
  password: string()
    .required(ErrorsMessages.required)
    .matches(Regex.minEightSymbol, ErrorsMessages.atLeastEightCharacters)
    .matches(Regex.passwordUpperLetter, { message: ErrorsMessages.withUpperLater })
    .matches(Regex.passwordMinOneNum, { message: ErrorsMessages.withNumber }),
  passwordConfirmation: lazy(value =>
    string().when('passwordConfirmation', (_, schema) =>
      value === ''
        ? schema.required(ErrorsMessages.required)
        : schema.oneOf([ref('password')], 'Пароли не совпадают')
    )
  ),
})

export const usernameSchema = object({
  username: string()
    .required(ErrorsMessages.required)
    .matches(Regex.loginLetter, 'латинский алфавит')
    .matches(Regex.loginNumber, 'цифры'),
})

export const passwordSchema = object({
  password: string()
    .required(ErrorsMessages.required)
    .matches(Regex.minEightSymbol, ErrorsMessages.atLeastEightCharacters)
    .matches(Regex.passwordUpperLetter, { message: ErrorsMessages.withUpperLater })
    .matches(Regex.passwordMinOneNum, { message: ErrorsMessages.withNumber }),
})
