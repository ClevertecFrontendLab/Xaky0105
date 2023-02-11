import { IBook } from '@/types/books'
import { ICategory } from '@/types/categories'

interface ICategoryWithQuantity extends ICategory {
  quantity: number
}

export const createNavCategories = (books: IBook[], categories: ICategory[]) => {
  const quantity = {} as { [key: string]: number }

  books.forEach(book => {
    book.categories.forEach(category => {
      if (quantity[category]) {
        quantity[category] += 1
      } else {
        quantity[category] = 1
      }
    })
  })

  const result = [] as ICategoryWithQuantity[]

  categories.forEach((category, index) =>
    index === 0
      ? result.push(
          { id: 0, name: 'Все книги', path: 'all', quantity: books.length },
          { ...category, quantity: quantity[category.name] }
        )
      : result.push({ ...category, quantity: quantity[category.name] })
  )

  return result
}

export const getTranslateCategory = (category: string, categories: ICategory[], books: IBook[]) => {
  const navCategories = createNavCategories(books, categories)

  return navCategories.filter(item => item.path === category)[0]?.name
}
