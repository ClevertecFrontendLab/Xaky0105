import { Dispatch } from 'react'
import { runSaga, Saga } from 'redux-saga'

import { axiosInstance } from '../../../api/api'
import { CategoryType } from '../../../types/categories'
import { RequestErrors } from '../../../types/errors'
import { categoriesMock } from '../../../utils/__mocks__/categories'
import { getCategoriesFailure, getCategoriesSuccess } from '../../books/books.slice'
import { categoriesRequestWorker } from '../categories'

describe('categories request', () => {
  let dispatched: Array<Dispatch<CategoryType[]>> = []

  beforeEach(() => {
    dispatched = []
  })

  it('categories success', async () => {
    const categories = jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: categoriesMock })

    await runSaga(
      {
        getState: () => ({ state: 'test' }),
        dispatch: (action: never) => dispatched.push(action),
      },
      categoriesRequestWorker as Saga
    )
    expect(categories).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getCategoriesSuccess(categoriesMock)])
  })
  it('put error data to store if categories error', async () => {
    const categories = jest
      .spyOn(axiosInstance, 'get')
      .mockRejectedValue({ message: RequestErrors.smthWrong })

    await runSaga(
      {
        getState: () => ({ state: 'test' }),
        dispatch: (action: never) => dispatched.push(action),
      },
      categoriesRequestWorker as Saga
    )
    expect(categories).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([getCategoriesFailure(RequestErrors.smthWrong)])
  })
})
