import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IBook } from '@/types/books'

import { IBooksState } from './books.interface'

const initialState: IBooksState = {
  books: [],
  isLoading: false,
  error: '',
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooksSuccess: (state, action: PayloadAction<IBook[]>) => {
      state.books = action.payload
      state.isLoading = false
    },
    getBooksFetch: state => {
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
