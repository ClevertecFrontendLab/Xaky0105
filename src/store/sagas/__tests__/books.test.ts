import { Dispatch } from 'react'
import { runSaga, Saga } from 'redux-saga'

import { axiosInstance } from '../../../api/api'
import { BookType } from '../../../types/books'
import { RequestErrors } from '../../../types/errors'
import { booksMock } from '../../../utils/__mocks__/books'
import { getBooksFailure, getBooksSuccess } from '../../books/books.slice'
import { booksRequestWorker } from '../books'

describe('books request', () => {
  let dispatched: Array<Dispatch<BookType[]>> = []

  beforeEach(() => {
    dispatched = []
  })

  it('put books to store if no errors', async () => {
    const books = jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: booksMock })

    await runSaga(
      {
        getState: () => ({ state: 'test' }),
        dispatch: (action: never) => dispatched.push(action),
      },
      booksRequestWorker as Saga
    )

    expect(books).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getBooksSuccess(booksMock)])
  })
  it('put error data to store if error', async () => {
    const books = jest
      .spyOn(axiosInstance, 'get')
      .mockRejectedValue({ message: RequestErrors.smthWrong })

    await runSaga(
      {
        getState: () => ({ state: 'test' }),
        dispatch: (action: never) => dispatched.push(action),
      },
      booksRequestWorker as Saga
    )

    expect(books).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getBooksFailure(RequestErrors.smthWrong)])
  })
})
