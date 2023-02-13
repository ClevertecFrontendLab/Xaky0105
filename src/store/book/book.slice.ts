import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BookDetailedType } from '../../types/books'

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
      state.isLoading = false
      state.book = action.payload
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
  },
})

export const { getBookSuccess, getBookFetch, getBookFailure } = bookSlice.actions

export const bookReducer = bookSlice.reducer
