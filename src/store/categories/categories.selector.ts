import { RootState } from '..'

export const selectCategories = ({ categories: { categories } }: RootState) => categories
export const selectIsLoadingCategories = ({ categories: { isLoading } }: RootState) => isLoading
export const selectErrorCategories = ({ categories: { error } }: RootState) => error
export const selectCategoriesByName =
  (name: string) =>
  ({ categories: { categories } }: RootState) =>
    categories.filter(category => category.name === name)[0]
