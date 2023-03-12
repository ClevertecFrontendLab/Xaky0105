import { Dispatch } from 'react'
import { runSaga, RunSagaOptions, Saga } from 'redux-saga'
import { takeLatest } from 'redux-saga/effects'

import { axiosInstance } from '../../../api/api'
import { BookDetailedType } from '../../../types/books'
import { RequestErrors } from '../../../types/errors'
import { AppDispatch, RootState } from '../..'
import { bookMock, mockedState } from '../../__mocks__/book-detailed'
import { bookDetailedSelector } from '../../book-detailed/book-detailed.selector'
import {
  getBookDetailedFailure,
  getBookDetailedRequest,
  getBookDetailedSuccess,
} from '../../book-detailed/book-detailed.slice'
import { bookDetailedRequestWatcher, bookDetailedRequestWorker } from '../book-detailed'

describe('book-detailed saga', () => {
  const mainGen = bookDetailedRequestWatcher()
  const expected = takeLatest(getBookDetailedRequest.type, bookDetailedRequestWorker)
  let dispatched: Array<Dispatch<BookDetailedType>> = []
  let fakeStore: RunSagaOptions<AppDispatch, RootState>

  beforeEach(() => {
    dispatched = []
    fakeStore = {
      dispatch: (action: never) => dispatched.push(action),
      getState: () => mockedState,
    }
  })

  it('Should fire on getBookDetailedRequest', () => {
    const actual = mainGen.next().value

    expect(actual).toEqual(expected)
  })

  it('selector should return the desired state', () => {
    const res = bookDetailedSelector(mockedState)

    expect(res).toEqual(mockedState.bookDetailed)
  })

  it('put book detailed to store if no errors', async () => {
    const getBookDetailed = jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: bookMock })

    await runSaga(fakeStore, bookDetailedRequestWorker as Saga, bookMock.id)

    expect(getBookDetailed).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getBookDetailedSuccess(bookMock)])
  })
  it('put error data to store if error', async () => {
    const getBookDetailed = jest
      .spyOn(axiosInstance, 'get')
      .mockRejectedValue({ message: RequestErrors.smthWrong })

    await runSaga(fakeStore, bookDetailedRequestWorker as Saga, bookMock.id)

    expect(getBookDetailed).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getBookDetailedFailure(RequestErrors.smthWrong)])
  })
})
