import { describe, expect, test } from '@jest/globals'

import { btnRegistrationMessage } from '../registration'

describe('registration button message', () => {
  test('registration step one to equal Следующий шаг', () => {
    expect(btnRegistrationMessage(1)).toBe('Следующий шаг')
  })
  test('registration step two to equal Последний шаг', () => {
    expect(btnRegistrationMessage(2)).toBe('Последний шаг')
  })
  test('registration step three to equal Зарегистрироваться', () => {
    expect(btnRegistrationMessage(3)).toBe('Зарегистрироваться')
  })
  test('registration step ten to equal Следующий шаг', () => {
    expect(btnRegistrationMessage(10)).toBe('Следующий шаг')
  })
})
