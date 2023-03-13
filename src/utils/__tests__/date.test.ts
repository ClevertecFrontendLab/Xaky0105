import { formatDateButton } from '../date'

describe('format button date', () => {
  it('should format date to equal 07.03', () => {
    expect(formatDateButton('2023-03-07T00:00:00.000Z')).toBe('07.03')
  })
  it('should format date not equal 24.01.2023', () => {
    expect(formatDateButton('2023-01-24T13:31:42.192Z')).not.toBe('24.01.2023')
  })
  it('add empty string to equal empty string', () => {
    expect(formatDateButton('')).toBe('')
  })
})
