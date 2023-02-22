import { useEffect, useRef } from 'react'
import classNames from 'classnames'

import { useBooleanState } from '../../../hooks/use-boolean-state'
import { DataTestId, Size } from '../../../types/other'

import { ReactComponent as CloseIcon } from './assets/close.svg'
import { ReactComponent as SearchIcon } from './assets/search.svg'

import styles from './search-input.module.scss'

type SearchInputType = {
  placeholder: string
  size?: Size
  inputText: string
  changeInputText: (value: string) => void
  closeHandler?: () => void
  autofocus?: boolean
}

export const SearchInput = ({
  placeholder,
  size = Size.medium,
  inputText,
  changeInputText,
  closeHandler,
  autofocus = false,
}: SearchInputType) => {
  const { state: isFocus, setTrue, setFalse } = useBooleanState()
  const inputElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!autofocus) {
      return
    }

    if (inputElement.current) {
      inputElement.current.focus()
    }
  }, [autofocus])

  return (
    <div className={classNames(styles.inputWrap, { [styles.small]: size === Size.small })}>
      {size === Size.medium && (
        <SearchIcon
          className={classNames(styles.searchIcon, { [styles.searchIconColor]: isFocus })}
        />
      )}
      <input
        type='text'
        className={classNames(styles.searchInput, {
          [styles.normal]: size === Size.medium,
          [styles.small]: size === Size.small,
        })}
        placeholder={placeholder}
        onBlur={setFalse}
        onFocus={setTrue}
        onChange={e => changeInputText(e.target.value)}
        value={inputText}
        ref={inputElement}
        data-test-id={DataTestId.InputSearch}
      />
      <CloseIcon
        className={classNames(styles.closeIcon, { [styles.closeIconColor]: isFocus })}
        onClick={closeHandler}
        data-test-id={DataTestId.ButtonSearchClose}
      />
    </div>
  )
}
