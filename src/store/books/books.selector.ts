import { RootState } from '..'

export const selectBooksAll = ({ books: { books } }: RootState) => books
export const selectIsLoadingBooks = ({ books: { isLoading } }: RootState) => isLoading
export const selectErrorBooks = ({ books: { error } }: RootState) => error

export const selectBookById =
  (id: number) =>
  ({ books: { books } }: RootState) =>
    books.find(book => book.id === id)
