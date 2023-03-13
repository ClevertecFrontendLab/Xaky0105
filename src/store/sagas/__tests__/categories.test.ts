import { Dispatch } from 'react'
import { runSaga, RunSagaOptions, Saga } from 'redux-saga'
import { takeLatest } from 'redux-saga/effects'

import { axiosInstance } from '../../../api/api'
import { CategoryType } from '../../../types/categories'
import { RequestErrors } from '../../../types/errors'
import { categoriesMock } from '../../../utils/__mocks__/categories'
import { AppDispatch, RootState } from '../..'
import { mockedState } from '../../__mocks__/books'
import { booksSelector } from '../../books/books.selector'
import {
  getCategoriesFailure,
  getCategoriesRequest,
  getCategoriesSuccess,
} from '../../books/books.slice'
import { categoriesRequestWatcher, categoriesRequestWorker } from '../categories'

describe('categories saga', () => {
  const mainGen = categoriesRequestWatcher()
  const expected = takeLatest(getCategoriesRequest.type, categoriesRequestWorker)
  let dispatchedActions: Array<Dispatch<CategoryType[]>> = []
  let fakeStore: RunSagaOptions<AppDispatch, RootState>

  beforeEach(() => {
    dispatchedActions = []
    fakeStore = {
      getState: () => mockedState,
      dispatch: (action: never) => dispatchedActions.push(action),
    }
  })

  it('should fire on getCategoriesRequest', () => {
    const actual = mainGen.next().value

    expect(actual).toEqual(expected)
  })

  it('selector should return the desired state', () => {
    const res = booksSelector(mockedState)

    expect(res).toEqual(mockedState.books)
  })

  it('categories success', async () => {
    const getCategories = jest
      .spyOn(axiosInstance, 'get')
      .mockResolvedValue({ data: categoriesMock })

    await runSaga(fakeStore, categoriesRequestWorker as Saga)
    expect(getCategories).toHaveBeenCalledTimes(1)
    expect(dispatchedActions).toEqual([getCategoriesSuccess(categoriesMock)])
  })
  it('put error data to store if categories error', async () => {
    const getCategories = jest
      .spyOn(axiosInstance, 'get')
      .mockRejectedValue({ message: RequestErrors.smthWrong })

    await runSaga(fakeStore, categoriesRequestWorker as Saga)
    expect(getCategories).toHaveBeenCalledTimes(1)
    expect(dispatchedActions).toEqual([getCategoriesFailure(RequestErrors.smthWrong)])
  })
})
