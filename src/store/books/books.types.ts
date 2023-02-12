import { BookType } from '@/types/books'

export type BooksState = {
  books: BookType[] | null
  isLoading: boolean
  error: string | null
}
