import { describe, expect, test } from '@jest/globals'

import { BookType } from '../../types/books'
import { CategoryType } from '../../types/categories'
import {
  CategoryWithQuantityType,
  createCategoriesWithQuantity,
  getQuantityMap,
} from '../categories'

const booksMock = [
  {
    title: 'Книга 1',
    categories: ['Бизнес'],
    rating: 3,
  },
  {
    title: 'Книга 2',
    categories: ['Детские', 'Фантастика'],
    rating: 1,
  },
  {
    title: 'Книга 3',
    categories: ['Хобби'],
    rating: 5,
  },
  {
    title: 'Книга 4',
    categories: ['Программирование', 'Фантастика'],
    rating: 2,
  },
  {
    title: 'Книга 5',
    categories: ['Хобби'],
    rating: null,
  },
] as BookType[]

const categoriesMock: CategoryType[] = [
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

const categoriesWithQuantityMock: CategoryWithQuantityType[] = [
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

describe('create nav categories', () => {
  const quantityMapMock = {
    Бизнес: 1,
    Детские: 1,
    Фантастика: 2,
    Хобби: 2,
    Программирование: 1,
  }

  test('correct calculation of the quantity', () => {
    expect(getQuantityMap(booksMock)).toEqual(quantityMapMock)
  })
  test('correct create nav categories with quantity', () => {
    expect(createCategoriesWithQuantity(categoriesMock, quantityMapMock)).toEqual(
      categoriesWithQuantityMock
    )
  })
})
