import { RootState } from '..'

export const selectBookDetailed = ({ book: { book } }: RootState) => book
export const selectIsLoadingBook = ({ book: { isLoading } }: RootState) => isLoading
export const selectErrorBook = ({ book: { error } }: RootState) => error
