import { IBook } from '@/types/books'

export const getFilterBooks = (books: IBook[], filter: string, category: string) =>
  books.filter(elem => {
    if (category !== 'Все книги') {
      return (
        elem.title.toLowerCase().includes(filter.toLowerCase()) &&
        elem.categories.includes(category)
      )
    }

    return elem.title.toLowerCase().includes(filter.toLowerCase())
  })
