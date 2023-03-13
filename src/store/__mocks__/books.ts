import { BookType } from '../../types/books'
import { RootState } from '..'

export const booksMock = [
  {
    title: 'Книга 1',
    categories: ['Бизнес'],
    rating: 3,
  },
  {
    title: 'Книга 2',
    categories: ['Детские', 'Фантастика'],
    rating: 1,
  },
  {
    title: 'Книга 3',
    categories: ['Хобби'],
    rating: 5,
  },
  {
    title: 'Книга 4',
    categories: ['Программирование', 'Фантастика'],
    rating: 2,
  },
  {
    title: 'Книга 5',
    categories: ['Хобби'],
    rating: null,
  },
] as BookType[]

export const mockedState = {
  books: {
    books: null,
    categories: null,
    error: null,
    isLoadingBooks: false,
    isLoadingCategories: false,
  },
} as RootState
