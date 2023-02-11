import { IBookDetailed } from '@/types/books'

export interface IBookState {
  book: IBookDetailed
  isLoading: boolean
  error: string
}
