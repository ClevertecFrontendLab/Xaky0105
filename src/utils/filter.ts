import { BookType } from '../types/books'
import { CategoryType } from '../types/categories'

export const getFilterBooks = (
  books: BookType[],
  filter: string,
  categories: CategoryType[] | null,
  category: string
) => {
  const categoryName = categories?.find(({ path }) => path === category)?.name

  if (!categoryName) {
    return books.filter(book => book.title.toLowerCase().includes(filter.toLowerCase()))
  }

  const filterBooks = books.filter(
    book =>
      book.title.toLowerCase().includes(filter.toLowerCase()) &&
      book.categories?.includes(categoryName)
  )

  return filterBooks
}
