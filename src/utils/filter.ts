import { BookType } from '../types/books'
import { AllBooks } from '../types/other'

export const getFilterBooks = (books: BookType[], filter: string, category: string) =>
  books.filter(elem => {
    if (category !== AllBooks.name) {
      return (
        elem.title.toLowerCase().includes(filter.toLowerCase()) &&
        elem.categories?.includes(category)
      )
    }

    return elem.title.toLowerCase().includes(filter.toLowerCase())
  })
