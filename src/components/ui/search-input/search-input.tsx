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
    <div
      className={classNames(styles.inputWrap, size === Size.small && styles.small)}
      data-test-id={DataTestId['input-search']}
    >
      {size === Size.medium && (
        <SearchIcon className={classNames(styles.searchIcon, isFocus && styles.searchIconColor)} />
      )}
      <input
        type='text'
        className={classNames(
          styles.searchInput,
          size === Size.medium && styles.normal,
          size === Size.small && styles.small
        )}
        placeholder={placeholder}
        onBlur={setFalse}
        onFocus={setTrue}
        onChange={e => changeInputText(e.target.value)}
        value={inputText}
        ref={inputElement}
      />
      <CloseIcon
        className={classNames(styles.closeIcon, isFocus && styles.closeIconColor)}
        onClick={closeHandler}
        data-test-id={DataTestId['button-search-close']}
      />
    </div>
  )
}
