import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BookType } from '../../types/books'
import { CategoryType } from '../../types/categories'

import { BooksState } from './books.types'

const initialState: BooksState = {
  books: null,
  categories: null,
  isLoadingBooks: false,
  isLoadingCategories: false,
  error: null,
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooksSuccess: (state, action: PayloadAction<BookType[]>) => {
      state.isLoadingBooks = false
      state.books = action.payload
    },
    getBooksWithCategoryRequest: state => {
      state.books = null
      state.categories = null
      state.error = null
      state.isLoadingBooks = true
      state.isLoadingCategories = true
    },
    getBooksRequest: state => {
      state.books = null
      state.error = null
      state.isLoadingBooks = true
    },
    getBooksFailure: (state, action: PayloadAction<string | null>) => {
      state.isLoadingBooks = false
      state.error = action.payload
    },
    getCategoriesSuccess: (state, action: PayloadAction<CategoryType[]>) => {
      state.isLoadingCategories = false
      state.categories = action.payload
    },
    getCategoriesRequest: state => {
      state.categories = null
      state.error = null
      state.isLoadingCategories = true
    },
    getCategoriesFailure: (state, action: PayloadAction<string | null>) => {
      state.isLoadingCategories = false
      state.error = action.payload
    },
  },
})

export const {
  getBooksSuccess,
  getBooksWithCategoryRequest,
  getBooksFailure,
  getCategoriesSuccess,
  getBooksRequest,
  getCategoriesRequest,
  getCategoriesFailure,
} = booksSlice.actions

export const booksReducer = booksSlice.reducer
