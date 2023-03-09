import { booksMock } from '../../utils/__mocks__/books'
import { categoriesMock } from '../../utils/__mocks__/categories'
import {
  booksReducer,
  getBooksFailure,
  getBooksRequest,
  getBooksSuccess,
  getBooksWithCategoryRequest,
  getCategoriesFailure,
  getCategoriesRequest,
  getCategoriesSuccess,
} from '../books/books.slice'
import { BooksState } from '../books/books.types'

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

  it('should added all books to store', () => {
    const { books, isLoadingBooks } = booksReducer(state, getBooksSuccess(booksMock))

    expect(books).toEqual(booksMock)
    expect(isLoadingBooks).toBeFalsy()
  })

  it('should set error books to store', () => {
    const { error, isLoadingBooks } = booksReducer(state, getBooksFailure('Ошибка'))

    expect(error).toBe('Ошибка')
    expect(isLoadingBooks).toBeFalsy()
  })
  it('should books loader set true', () => {
    const { isLoadingBooks, books, error } = booksReducer(state, getBooksRequest())

    expect(isLoadingBooks).toBeTruthy()
    expect(books).toBeNull()
    expect(error).toBeNull()
  })
  it('should add categories to store', () => {
    const { categories, isLoadingCategories } = booksReducer(
      state,
      getCategoriesSuccess(categoriesMock)
    )

    expect(categories).toEqual(categoriesMock)
    expect(isLoadingCategories).toBeFalsy()
  })
  it('should categories loader set true', () => {
    const { isLoadingCategories, categories, error } = booksReducer(state, getCategoriesRequest())

    expect(isLoadingCategories).toBeTruthy()
    expect(categories).toBeNull()
    expect(error).toBeNull()
  })
  it('should set error categories', () => {
    const { error, isLoadingCategories } = booksReducer(state, getCategoriesFailure('Ошибка'))

    expect(error).toBe('Ошибка')
    expect(isLoadingCategories).toBeFalsy()
  })
  it('books with categories request', () => {
    const { error, isLoadingCategories, isLoadingBooks, books, categories } = booksReducer(
      state,
      getBooksWithCategoryRequest()
    )

    expect(books).toBeNull()
    expect(categories).toBeNull()
    expect(error).toBeNull()
    expect(isLoadingCategories).toBeTruthy()
    expect(isLoadingBooks).toBeTruthy()
  })
})
