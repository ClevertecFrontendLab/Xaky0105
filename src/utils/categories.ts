import { IBook } from '@/types/books'
import { ICategory } from '@/types/categories'

interface ICategoryWithQuantity extends ICategory {
  quantity: number
}

export const createNavCategories = (books: IBook[], categories: ICategory[]) => {
  const quantityMap = books.reduce((acc: Record<string, number>, book) => {
    book.categories.forEach(category => {
      if (acc[category]) {
        acc[category] += 1

        return acc
      }
      acc[category] = 1

      return acc
    })

    return acc
  }, {})

  return categories.reduce((acc: ICategoryWithQuantity[], category, index) => {
    if (index === 0) {
      return [
        ...acc,
        { id: 0, name: 'Все книги', path: 'all', quantity: books.length },
        { ...category, quantity: quantityMap[category.name] },
      ]
    }

    return [...acc, { ...category, quantity: quantityMap[category.name] }]
  }, [])
}

export const getTranslateCategory = (category: string, categories: ICategory[], books: IBook[]) => {
  const navCategories = createNavCategories(books, categories)

  return navCategories.filter(item => item.path === category)[0]?.name
}
