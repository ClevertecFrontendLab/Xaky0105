import { BookType } from '../../types/books'
import { CategoryType } from '../../types/categories'

export type BooksState = {
  books: BookType[] | null
  categories: CategoryType[] | null
  isLoadingBooks: boolean
  isLoadingCategories: boolean
  error: string | null
}
