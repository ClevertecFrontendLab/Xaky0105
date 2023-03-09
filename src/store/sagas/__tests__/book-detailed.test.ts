import { Dispatch } from 'react'
import { runSaga, Saga } from 'redux-saga'

import { axiosInstance } from '../../../api/api'
import { BookDetailedType } from '../../../types/books'
import { RequestErrors } from '../../../types/errors'
import {
  getBookDetailedFailure,
  getBookDetailedSuccess,
} from '../../book-detailed/book-detailed.slice'
import { bookDetailedRequestWorker } from '../book-detailed'

describe('book-detailed request', () => {
  const bookId = 5

  const book = {
    id: 1,
    title: 'Книга 1',
  } as BookDetailedType

  let dispatched: Array<Dispatch<BookDetailedType>> = []

  beforeEach(() => {
    dispatched = []
  })

  it('put book detailed to store if no errors', async () => {
    const bookDetailed = jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: book })

    await runSaga(
      {
        getState: () => ({ state: 'test' }),
        dispatch: (action: never) => dispatched.push(action),
      },
      bookDetailedRequestWorker as Saga,
      bookId
    )

    expect(bookDetailed).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getBookDetailedSuccess(book)])
  })
  it('put error data to store if error', async () => {
    const errorMessage = RequestErrors.smthWrong
    const bookDetailed = jest
      .spyOn(axiosInstance, 'get')
      .mockRejectedValue({ message: errorMessage })

    await runSaga(
      {
        getState: () => ({ state: 'test' }),
        dispatch: (action: never) => dispatched.push(action),
      },
      bookDetailedRequestWorker as Saga,
      bookId
    )

    expect(bookDetailed).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getBookDetailedFailure(errorMessage)])
  })
})
