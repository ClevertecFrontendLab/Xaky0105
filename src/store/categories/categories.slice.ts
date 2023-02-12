import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CategoryType } from '@/types/categories'

import { CategoriesState } from './categories.types'

const initialState: CategoriesState = {
  categories: null,
  currentCategory: null,
  isLoading: false,
  error: null,
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoriesSuccess: (state, action: PayloadAction<CategoryType[]>) => {
      state.isLoading = false
      state.categories = action.payload
    },
    getCategoriesFetch: state => {
      state.categories = null
      state.error = null
      state.isLoading = true
    },
    getCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    setCurrentCategory: (state, action: PayloadAction<CategoryType>) => {
      state.currentCategory = action.payload
    },
  },
})

export const {
  getCategoriesSuccess,
  getCategoriesFetch,
  getCategoriesFailure,
  setCurrentCategory,
} = categoriesSlice.actions

export const categoriesReducer = categoriesSlice.reducer
