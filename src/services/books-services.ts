import { BookDetailedType, BookType } from '@/types/books'

import { axiosInstance } from '../api/api'

export const booksService = {
  async getBooks() {
    return (await axiosInstance.get<BookType[]>('/api/books')).data
  },
  async getBookDetailed(id: number) {
    return (await axiosInstance.get<BookDetailedType>(`/api/books/${id}`)).data
  },
}
