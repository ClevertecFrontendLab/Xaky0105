import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BookDetailedType } from '@/types/books'

import { BookState } from './book.types'

const initialState: BookState = {
  book: null,
  isLoading: false,
  error: null,
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    getBookSuccess: (state, action: PayloadAction<BookDetailedType>) => {
      state.book = action.payload
      state.isLoading = false
    },
    getBookFetch: (state, _: PayloadAction<string>) => {
      state.book = null
      state.error = null
      state.isLoading = true
    },
    getBookFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    clearBook: state => {
      state.error = null
      state.book = null
    },
  },
})

export const { getBookSuccess, getBookFetch, getBookFailure, clearBook } = bookSlice.actions

export const bookReducer = bookSlice.reducer
