import { BookType } from '../../../types/books'
import { CategoryType } from '../../../types/categories'
import {
  booksReducer,
  getBooksFailure,
  getBooksRequest,
  getBooksSuccess,
  getCategoriesFailure,
  getCategoriesRequest,
  getCategoriesSuccess,
} from '../books.slice'
import { BooksState } from '../books.types'

describe('books reducers testing', () => {
  let state: BooksState

  beforeEach(() => {
    state = {
      books: null,
      categories: null,
      isLoadingBooks: false,
      isLoadingCategories: false,
      error: null,
    }
  })

  test('should add books all', () => {
    const books = [
      {
        title: 'Книга 1',
        id: 1,
        rating: 4,
      },
      {
        title: 'Книга 2',
        id: 2,
        rating: 3,
      },
    ] as BookType[]

    const newState = booksReducer(state, getBooksSuccess(books))

    expect(newState.books).toEqual(books)
  })

  test('should set error books', () => {
    const newState = booksReducer(state, getBooksFailure('Ошибка'))

    expect(newState.error).toBe('Ошибка')
  })
  test('should books loader set true', () => {
    const newState = booksReducer(state, getBooksRequest())

    expect(newState.isLoadingBooks).toBeTruthy()
  })
  test('should add categories', () => {
    const categories = [
      {
        id: 1,
        name: 'Бизнес',
        path: 'business',
      },
      {
        id: 2,
        name: 'Программирование',
        path: 'programming',
      },
    ] as CategoryType[]
    const newState = booksReducer(state, getCategoriesSuccess(categories))

    expect(newState.categories).toEqual(categories)
  })
  test('should categories loader set true', () => {
    const newState = booksReducer(state, getCategoriesRequest())

    expect(newState.isLoadingCategories).toBeTruthy()
  })
  test('should set error categories', () => {
    const newState = booksReducer(state, getCategoriesFailure('Ошибка'))

    expect(newState.error).toBe('Ошибка')
  })
})
