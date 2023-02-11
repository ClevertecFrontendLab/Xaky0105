import { IBook, IBookDetailed } from '@/types/books'

import { axiosInstance } from '../api/api'

export const booksService = {
  async getBooks() {
    return (await axiosInstance.get<IBook[]>('/api/books')).data
  },
  async getBookDetailed(id: number) {
    return (await axiosInstance.get<IBookDetailed>(`/api/books/${id}`)).data
  },
}
