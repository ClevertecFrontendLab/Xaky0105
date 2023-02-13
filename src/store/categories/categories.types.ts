import { CategoryType } from '../../types/categories'

export type CategoriesState = {
  categories: CategoryType[] | null
  currentCategory: CategoryType | null
  isLoading: boolean
  error: string | null
}
