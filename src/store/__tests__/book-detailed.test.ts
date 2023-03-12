import { bookMock } from '../__mocks__/book-detailed'
import {
  bookDetailedReducer,
  getBookDetailedFailure,
  getBookDetailedRequest,
  getBookDetailedSuccess,
  initialState,
} from '../book-detailed/book-detailed.slice'
import { BookDetailedState } from '../book-detailed/book-detailed.types'

describe('book-detailed reducers testing', () => {
  let state: BookDetailedState

  beforeEach(() => {
    state = initialState
  })
  it('should add book-detailed', () => {
    const { book, isLoading } = bookDetailedReducer(state, getBookDetailedSuccess(bookMock))

    expect(book).toEqual(book)
    expect(isLoading).toBeFalsy()
  })

  it('should add error', () => {
    const { error } = bookDetailedReducer(state, getBookDetailedFailure('Ошибка'))

    expect(error).toBe('Ошибка')
  })
  it('should loader set true', () => {
    const { book, error, isLoading } = bookDetailedReducer(state, getBookDetailedRequest('2'))

    expect(error).toBeNull()
    expect(book).toBeNull()
    expect(isLoading).toBeTruthy()
  })
})
