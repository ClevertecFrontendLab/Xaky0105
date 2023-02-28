import { object, string } from 'yup'

import { Regex } from './regex'

export const registerStepOneSchema = object({
  username: string()
    .required('Поле не может быть пустым')
    .matches(Regex.loginLetter, 'латинский алфавит')
    .matches(Regex.loginNumber, 'цифры'),
  password: string()
    .required('Поле не может быть пустым')
    .matches(Regex.passwordBase, {
      message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
    })
    .min(8, 'не менее 8 символов')
    .matches(Regex.passwordUpperLetter, { message: 'с заглавной буквой' })
    .matches(Regex.passwordMinOneNum, { message: 'цифрой' }),
})

export const registerStepTwoSchema = object({
  firstName: string().required('Поле не может быть пустым'),
  lastName: string().required('Поле не может быть пустым'),
})

export const registerStepThreeSchema = object({
  phone: string()
    .required('Поле не может быть пустым')
    .matches(Regex.phone, { message: 'В формате +375 (xx) xxx-xx-xx' }),
  email: string().email('Введите корректный e-mail').required('Поле не может быть пустым'),
})

export const loginSchema = object({
  identifier: string().required('Поле не может быть пустым'),
  password: string().required('Поле не может быть пустым'),
})

export const forgotPasswordSchema = object({
  email: string().email('Введите корректный e-mail').required('Поле не может быть пустым'),
})
export const resetPasswordSchema = object({
  password: string()
    .required('Поле не может быть пустым')
    .matches(Regex.passwordBase, {
      message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
    })
    .min(8, 'не менее 8 символов')
    .matches(Regex.passwordUpperLetter, { message: 'с заглавной буквой' })
    .matches(Regex.passwordMinOneNum, { message: 'цифрой' }),
})
