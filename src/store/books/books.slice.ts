import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BookType } from '@/types/books'

import { BooksState } from './books.types'

const initialState: BooksState = {
  books: null,
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
    getBooksFetch: state => {
      state.books = null
      state.error = null
      state.isLoading = true
    },
    getBooksFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { getBooksSuccess, getBooksFetch, getBooksFailure } = booksSlice.actions

export const booksReducer = booksSlice.reducer
