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

export const sortBooksByRating = (books: BookType[], isSortBooksDescendingOrder: boolean) => {
  const booksWithRating: BookType[] = []
  const booksWithoutRating: BookType[] = []

  books.forEach(book => (book.rating ? booksWithRating.push(book) : booksWithoutRating.push(book)))

  if (isSortBooksDescendingOrder) {
    return [...booksWithRating.sort((a, b) => b.rating! - a.rating!), ...booksWithoutRating]
  }

  return [...booksWithoutRating, ...booksWithRating.sort((a, b) => a.rating! - b.rating!)]
}
