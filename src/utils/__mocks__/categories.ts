import { CategoryType } from '../../types/categories'
import { CategoryWithQuantityType } from '../categories'

export const categoriesMock: CategoryType[] = [
  {
    id: 1,
    name: 'Бизнес',
    path: 'business',
  },
  {
    id: 2,
    name: 'Детские',
    path: 'childish',
  },
  {
    id: 3,
    name: 'Фантастика',
    path: 'fantastic',
  },
  {
    id: 4,
    name: 'Хобби',
    path: 'hobby',
  },
  {
    id: 5,
    name: 'Программирование',
    path: 'programming',
  },
]

export const categoriesWithQuantityMock: CategoryWithQuantityType[] = [
  {
    id: 0,
    name: 'Все книги',
    path: 'all',
    quantity: null,
  },
  {
    id: 1,
    name: 'Бизнес',
    path: 'business',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Детские',
    path: 'childish',
    quantity: 1,
  },
  {
    id: 3,
    name: 'Фантастика',
    path: 'fantastic',
    quantity: 2,
  },
  {
    id: 4,
    name: 'Хобби',
    path: 'hobby',
    quantity: 2,
  },
  {
    id: 5,
    name: 'Программирование',
    path: 'programming',
    quantity: 1,
  },
]

export const quantityMapMock = {
  Бизнес: 1,
  Детские: 1,
  Фантастика: 2,
  Хобби: 2,
  Программирование: 1,
}
