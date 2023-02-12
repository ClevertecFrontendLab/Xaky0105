import { RootState } from '..'

export const selectBooks = ({ books }: RootState) => books

export const selectBookById =
  (id: string) =>
  ({ books: { books } }: RootState) =>
    books?.find(book => book.id === +id)
