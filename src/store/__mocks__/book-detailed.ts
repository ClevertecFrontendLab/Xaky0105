import { BookDetailedType } from '../../types/books'
import { RootState } from '..'

export const bookMock = {
  title: 'Книга 1',
  id: 1,
  rating: 4,
} as BookDetailedType

export const mockedState = {
  bookDetailed: {
    book: null,
    error: null,
    isLoading: false,
  },
} as RootState
