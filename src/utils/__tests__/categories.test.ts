import { booksMock } from '../__mocks__/books'
import {
  categoriesMock,
  categoriesWithQuantityMock,
  quantityMapMock,
} from '../__mocks__/categories'
import { createCategoriesWithQuantity, getQuantityMap } from '../categories'

describe('create nav categories', () => {
  it('correct calculation of the quantity', () => {
    expect(getQuantityMap(booksMock)).toEqual(quantityMapMock)
  })
  it('correct create nav categories with quantity', () => {
    expect(createCategoriesWithQuantity(categoriesMock, quantityMapMock)).toEqual(
      categoriesWithQuantityMock
    )
  })
})
