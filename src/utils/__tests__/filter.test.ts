import { describe, expect, test } from '@jest/globals'

import { BookSortingByRating, BookType } from '../../types/books'
import { sortBooksByRating } from '../filter'

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

describe('sort books by rating', () => {
  const sortedBooksDescending = sortBooksByRating(booksMock, BookSortingByRating.Descending)
  const sortedBooksAscending = sortBooksByRating(booksMock, BookSortingByRating.Ascending)

  test('books should sort descending', () => {
    expect(sortedBooksDescending[0].title).toBe('Книга 3')
    expect(sortedBooksDescending[4].title).toBe('Книга 5')
  })
  test('books should sort ascending', () => {
    expect(sortedBooksAscending[0].title).toBe('Книга 5')
    expect(sortedBooksAscending[4].title).toBe('Книга 3')
  })
})
