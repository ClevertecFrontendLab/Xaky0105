import { CategoryType } from '@/types/categories'

import { axiosInstance } from '../api/api'

export const categoriesService = {
  async getCategories() {
    return (await axiosInstance.get<CategoryType[]>('/api/categories')).data
  },
}
