import { Fragment } from 'react'

import { CustomSelect } from '@/components/ui/custom-select'
import { RoundButton } from '@/components/ui/round-button'
import { SearchInput } from '@/components/ui/search-input'

import { useBooleanState } from '@/hooks/use-boolean-state'

import { TypeSortMainPage } from '@/types/other'

import { ReactComponent as ListImg } from './assets/burger.svg'
import { ReactComponent as Search } from './assets/search.svg'
import { ReactComponent as Sort } from './assets/sort.svg'
import { ReactComponent as TileImg } from './assets/tile.svg'

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
                <RoundButton handler={setTrue}>
                  <Search />
                </RoundButton>
              </div>
            </span>
            <span className={styles.block}>
              <div className={styles.wrapper}>
                <CustomSelect placeholder='По рейтингу' />
              </div>
              <div className={styles.wrapperButton}>
                <RoundButton>
                  <Sort />
                </RoundButton>
              </div>
            </span>
          </div>
          <div className={styles.listType}>
            <span className={styles.itemWrapper}>
              <RoundButton
                changeSorting={changeSorting}
                selectSorting={selectSorting}
                sortingType={TypeSortMainPage.tile}
                dataTestId='button-menu-view-window'
              >
                <TileImg />
              </RoundButton>
            </span>
            <span className={styles.itemWrapper}>
              <RoundButton
                changeSorting={changeSorting}
                selectSorting={selectSorting}
                sortingType={TypeSortMainPage.list}
                dataTestId='button-menu-view-list'
              >
                <ListImg />
              </RoundButton>
            </span>
          </div>
        </Fragment>
      )}
    </div>
  )
}
