import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IBookDetailed } from '@/types/books'

import { IBookState } from './book.interface'

const initialState: IBookState = {
  book: {} as IBookDetailed,
  isLoading: false,
  error: '',
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    getBookSuccess: (state, action: PayloadAction<IBookDetailed>) => {
      state.book = action.payload
      state.isLoading = false
    },
    getBookFetch: (state, _: PayloadAction<number>) => {
      state.isLoading = true
    },
    getBookFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    clearBook: state => {
      state.book = {} as IBookDetailed
    },
  },
})

export const { getBookSuccess, getBookFetch, getBookFailure, clearBook } = bookSlice.actions

export const bookReducer = bookSlice.reducer
