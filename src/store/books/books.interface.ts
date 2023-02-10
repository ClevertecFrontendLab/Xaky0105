import { IBook } from '@/types/books'

export interface IBooksState {
  books: IBook[]
  isLoading: boolean
  error: string
}
