import { BookDetailedType } from '../../types/books'

export type BookState = {
  book: BookDetailedType | null
  isLoading: boolean
  error: string | null
}
