import { Dispatch } from 'react'
import { runSaga, RunSagaOptions, Saga } from 'redux-saga'
import { takeLatest } from 'redux-saga/effects'

import { axiosInstance } from '../../../api/api'
import { BookType } from '../../../types/books'
import { RequestErrors } from '../../../types/errors'
import { booksMock } from '../../../utils/__mocks__/books'
import { AppDispatch, RootState } from '../..'
import { mockedState } from '../../__mocks__/books'
import { booksSelector } from '../../books/books.selector'
import { getBooksFailure, getBooksRequest, getBooksSuccess } from '../../books/books.slice'
import { booksRequestWatcher, booksRequestWorker } from '../books'

describe('books saga', () => {
  const mainGen = booksRequestWatcher()
  const expected = takeLatest(getBooksRequest.type, booksRequestWorker)
  let dispatchedActions: Array<Dispatch<BookType[]>> = []
  let fakeStore: RunSagaOptions<AppDispatch, RootState>

  beforeEach(() => {
    dispatchedActions = []
    fakeStore = {
      getState: () => mockedState,
      dispatch: (action: never) => dispatchedActions.push(action),
    }
  })

  it('should fire on getBooksRequest', () => {
    const actual = mainGen.next().value

    expect(actual).toEqual(expected)
  })

  it('selector should return the desired state', () => {
    const res = booksSelector(mockedState)

    expect(res).toEqual(mockedState.books)
  })

  it('put books to store if no errors', async () => {
    const getBooks = jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: booksMock })

    await runSaga(fakeStore, booksRequestWorker as Saga)

    expect(getBooks).toHaveBeenCalledTimes(1)
    expect(dispatchedActions).toEqual([getBooksSuccess(booksMock)])
  })
  it('put error data to store if error', async () => {
    const getBooks = jest
      .spyOn(axiosInstance, 'get')
      .mockRejectedValue({ message: RequestErrors.smthWrong })

    await runSaga(fakeStore, booksRequestWorker as Saga)

    expect(getBooks).toHaveBeenCalledTimes(1)
    expect(dispatchedActions).toEqual([getBooksFailure(RequestErrors.smthWrong)])
  })
})
