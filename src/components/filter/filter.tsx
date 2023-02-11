import { Fragment } from 'react'

import { CustomSelect } from '@/components/ui/custom-select'
import { RoundButton } from '@/components/ui/round-button'
import { SearchInput } from '@/components/ui/search-input'

import { useBooleanState } from '@/hooks/use-boolean-state'

import { TypeSortMainPage } from '@/types/other'

import styles from './filter.module.scss'

interface IFilter {
  changeSorting: (type: TypeSortMainPage) => void
  selectSorting: TypeSortMainPage
  inputText: string
  changeInputText: (value: string) => void
}

export const Filter = ({ changeSorting, selectSorting, inputText, changeInputText }: IFilter) => {
  const { state: isShowOnlySearchInput, setFalse, setTrue } = useBooleanState()

  return (
    <div className={styles.filter}>
      {isShowOnlySearchInput ? (
        <SearchInput
          inputText={inputText}
          changeInputText={changeInputText}
          placeholder='Поиск книги или автора...'
          size='small'
          closeHandler={setFalse}
          autofocus={true}
        />
      ) : (
        <Fragment>
          <div className={styles.sorting}>
            <span className={styles.block}>
              <div className={styles.searchInputWrapper}>
                <SearchInput
                  inputText={inputText}
                  changeInputText={changeInputText}
                  placeholder='Поиск книги или автора...'
                  size='normal'
                />
              </div>
              <div className={styles.wrapperButton} data-test-id='button-search-open'>
                <RoundButton iconType='search' handler={setTrue} />
              </div>
            </span>
            <span className={styles.block}>
              <div className={styles.wrapper}>
                <CustomSelect placeholder='По рейтингу' />
              </div>
              <div className={styles.wrapperButton}>
                <RoundButton iconType='sort' />
              </div>
            </span>
          </div>
          <div className={styles.listType}>
            <span className={styles.itemWrapper}>
              <RoundButton
                iconType='tile'
                changeSorting={changeSorting}
                selectSorting={selectSorting}
                sortingType={TypeSortMainPage.tile}
                dataTestId='button-menu-view-window'
              />
            </span>
            <span className={styles.itemWrapper}>
              <RoundButton
                iconType='list'
                changeSorting={changeSorting}
                selectSorting={selectSorting}
                sortingType={TypeSortMainPage.list}
                dataTestId='button-menu-view-list'
              />
            </span>
          </div>
        </Fragment>
      )}
    </div>
  )
}
