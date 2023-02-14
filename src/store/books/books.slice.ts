import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BookType } from '../../types/books'
import { CategoryType } from '../../types/categories'

import { BooksState } from './books.types'

const initialState: BooksState = {
  books: null,
  categories: null,
  currentCategory: null,
  isLoading: false,
  error: null,
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooksSuccess: (state, action: PayloadAction<BookType[]>) => {
      state.isLoading = false
      state.books = action.payload
    },
    getBooksRequest: state => {
      state.books = null
      state.categories = null
      state.error = null
      state.isLoading = true
    },
    getBooksFailure: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false
      state.error = action.payload
    },
    getCategoriesSuccess: (state, action: PayloadAction<CategoryType[]>) => {
      state.isLoading = false
      state.categories = action.payload
    },
    setCurrentCategory: (state, action: PayloadAction<CategoryType>) => {
      state.currentCategory = action.payload
    },
  },
})

export const {
  getBooksSuccess,
  getBooksRequest,
  getBooksFailure,
  getCategoriesSuccess,
  setCurrentCategory,
} = booksSlice.actions

export const booksReducer = booksSlice.reducer
