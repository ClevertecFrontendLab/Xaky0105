import { BookType } from '../types/books'
import { CategoryType } from '../types/categories'
import { AllBooks } from '../types/other'

export type CategoryWithQuantityType = {
  quantity: number | null
  name: string
  path: string
  id: number
}

export const getQuantityMap = (books: BookType[]) =>
  books.reduce((acc: Record<string, number>, book) => {
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

export const createCategoriesWithQuantity = (
  categories: CategoryType[],
  quantityMap: Record<string, number>
) =>
  categories.reduce((acc: CategoryWithQuantityType[], category, index) => {
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

export const createNavCategories = (books: BookType[], categories: CategoryType[]) => {
  const quantityMap = getQuantityMap(books)

  console.log(createCategoriesWithQuantity(categories, quantityMap))

  return createCategoriesWithQuantity(categories, quantityMap)
}
