import { BookSortingByRating } from '../../types/books'
import { booksMock } from '../__mocks__/books'
import { sortBooksByRating } from '../filter'

describe('sort books by rating', () => {
  const sortedBooksDescending = sortBooksByRating(booksMock, BookSortingByRating.Descending)
  const sortedBooksAscending = sortBooksByRating(booksMock, BookSortingByRating.Ascending)

  it('books should sort descending', () => {
    expect(sortedBooksDescending[0].title).toBe('Книга 3')
    expect(sortedBooksDescending[4].title).toBe('Книга 5')
  })
  it('books should sort ascending', () => {
    expect(sortedBooksAscending[0].title).toBe('Книга 5')
    expect(sortedBooksAscending[4].title).toBe('Книга 3')
  })
})
