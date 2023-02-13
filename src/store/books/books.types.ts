import { BookType } from '../../types/books'
import { CategoryType } from '../../types/categories'

export type BooksState = {
  books: BookType[] | null
  categories: CategoryType[] | null
  currentCategory: CategoryType | null
  isLoading: boolean
  error: string | null
}
