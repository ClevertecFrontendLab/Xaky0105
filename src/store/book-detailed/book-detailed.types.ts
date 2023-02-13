import { BookDetailedType } from '../../types/books'

export type BookDetailedState = {
  book: BookDetailedType | null
  isLoading: boolean
  error: string | null
}
