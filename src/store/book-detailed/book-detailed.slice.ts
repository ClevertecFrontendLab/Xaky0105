import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BookDetailedType } from '../../types/books'

import { BookDetailedState } from './book-detailed.types'

export const initialState: BookDetailedState = {
  book: null,
  isLoading: false,
  error: null,
}

export const bookDetailedSlice = createSlice({
  name: 'book-detailed',
  initialState,
  reducers: {
    getBookDetailedSuccess: (state, action: PayloadAction<BookDetailedType>) => {
      state.isLoading = false
      state.book = action.payload
    },
    getBookDetailedRequest: (state, _: PayloadAction<string>) => {
      state.book = null
      state.error = null
      state.isLoading = true
    },
    getBookDetailedFailure: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { getBookDetailedSuccess, getBookDetailedRequest, getBookDetailedFailure } =
  bookDetailedSlice.actions

export const bookDetailedReducer = bookDetailedSlice.reducer
