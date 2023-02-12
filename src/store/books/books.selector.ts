import { RootState } from '..'

export const selectBooks = (state: RootState) => state.books

export const selectBookById = (id: string) => (state: RootState) =>
  state.books.books?.find(book => book.id === +id)
