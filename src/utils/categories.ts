import { BookType } from '../types/books'
import { CategoryType } from '../types/categories'
import { AllBooks } from '../types/other'

type CategoryWithQuantityType = {
  quantity: number | null
  name: string
  path: string
  id: number
}

export const createNavCategories = (books: BookType[], categories: CategoryType[]) => {
  const quantityMap = books.reduce((acc: Record<string, number>, book) => {
    book.categories?.forEach(category => {
      if (acc[category]) {
        acc[category] += 1

        return acc
      }
      acc[category] = 1

      return acc
    })

    return acc
  }, {})

  return categories.reduce((acc: CategoryWithQuantityType[], category, index) => {
    if (index === 0) {
      return [
        ...acc,
        { id: 0, name: AllBooks.name, path: AllBooks.path, quantity: null },
        { ...category, quantity: quantityMap[category.name] },
      ]
    }

    return [
      ...acc,
      { ...category, quantity: quantityMap[category.name] ? quantityMap[category.name] : 0 },
    ]
  }, [])
}
