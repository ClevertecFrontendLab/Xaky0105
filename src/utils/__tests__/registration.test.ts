import { btnRegistrationMessage } from '../registration'

describe('registration button message', () => {
  it('registration step one to equal Следующий шаг', () => {
    expect(btnRegistrationMessage(1)).toBe('Следующий шаг')
  })
  it('registration step two to equal Последний шаг', () => {
    expect(btnRegistrationMessage(2)).toBe('Последний шаг')
  })
  it('registration step three to equal Зарегистрироваться', () => {
    expect(btnRegistrationMessage(3)).toBe('Зарегистрироваться')
  })
  it('registration step ten to equal Следующий шаг', () => {
    expect(btnRegistrationMessage(10)).toBe('Следующий шаг')
  })
})
