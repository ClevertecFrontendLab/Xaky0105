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
    return books
  }

  const filterBooks = books.filter(
    elem =>
      elem.title.toLowerCase().includes(filter.toLowerCase()) &&
      elem.categories?.includes(categoryName)
  )

  return filterBooks
}
