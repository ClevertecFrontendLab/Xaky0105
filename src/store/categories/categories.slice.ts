import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICategory } from '@/types/categories'

import { ICategoriesState } from './categories.interface'

const initialState: ICategoriesState = {
  categories: [],
  isLoading: false,
  error: '',
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoriesSuccess: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload
      state.isLoading = false
    },
    getCategoriesFetch: state => {
      state.isLoading = true
    },
    getCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { getCategoriesSuccess, getCategoriesFetch, getCategoriesFailure } =
  categoriesSlice.actions

export const categoriesReducer = categoriesSlice.reducer
