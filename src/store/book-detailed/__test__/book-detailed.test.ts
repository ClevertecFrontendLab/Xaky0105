import { BookDetailedType } from '../../../types/books'
import {
  bookDetailedReducer,
  getBookDetailedFailure,
  getBookDetailedRequest,
  getBookDetailedSuccess,
} from '../book-detailed.slice'
import { BookDetailedState } from '../book-detailed.types'

describe('book-detailed reducers testing', () => {
  let state: BookDetailedState

  beforeEach(() => {
    state = {
      book: null,
      isLoading: false,
      error: null,
    }
  })
  test('should add book-detailed', () => {
    const book = {
      title: 'Книга 1',
      id: 1,
      rating: 4,
    } as BookDetailedType

    const newState = bookDetailedReducer(state, getBookDetailedSuccess(book))

    expect(newState.book).toEqual(book)
  })

  test('should add error', () => {
    const newState = bookDetailedReducer(state, getBookDetailedFailure('Ошибка'))

    expect(newState.error).toBe('Ошибка')
  })
  test('should loader set true', () => {
    const newState = bookDetailedReducer(state, getBookDetailedRequest('2'))

    expect(newState.isLoading).toBeTruthy()
  })
})
