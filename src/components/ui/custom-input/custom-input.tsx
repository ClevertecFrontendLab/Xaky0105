import { HTMLInputTypeAttribute, MouseEvent, useState } from 'react'
import { Path, UseFormRegisterReturn } from 'react-hook-form'
import { FieldError } from 'react-hook-form/dist/types'
import InputMask from 'react-input-mask'
import classNames from 'classnames'

import { DataTestId } from '../../../types/other'
import { HightLight } from '../../hight-light'

import Check from './assets/check-icon.svg'
import CloseEye from './assets/close-eye-icon.svg'
import OpenEye from './assets/open-eye-icon.svg'

import styles from './custom-input.module.scss'

type CustomFieldProps = {
  label: Path<string>
  register: UseFormRegisterReturn
  placeholder: string
  watchName: string
  messageHelper?: string
  error?: FieldError
  type: HTMLInputTypeAttribute
  withoutErrorMessage?: boolean
  mask?: string
  maskPlaceholder?: string
}

export const CustomInput = ({
  label,
  register,
  placeholder,
  watchName,
  messageHelper,
  error,
  withoutErrorMessage = false,
  type,
  mask,
  maskPlaceholder,
}: CustomFieldProps) => {
  const [isOpenEye, setIsOpenEye] = useState(false)

  const changeIsOpenEye = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    setIsOpenEye(!isOpenEye)
  }

  return (
    <label className={styles.label}>
      {mask ? (
        <InputMask
          className={classNames(styles.input, { [styles.inputError]: error?.message })}
          type={isOpenEye ? 'text' : type}
          maskChar={maskPlaceholder}
          mask={mask}
          {...register}
          alwaysShowMask={!error?.message && !watchName}
        />
      ) : (
        <input
          className={classNames(styles.input, { [styles.inputError]: error?.message })}
          {...register}
          type={isOpenEye ? 'text' : type}
        />
      )}

      <span className={classNames(styles.placeholder, { [styles.fixed]: watchName })}>
        {placeholder}
      </span>

      {messageHelper && (
        <HightLight
          text={error?.message === 'Поле не может быть пустым' ? error.message : messageHelper}
          searchWord={error?.message || ''}
          classNameHL='inputErrorText'
          dataTestId={DataTestId.Hint}
        />
      )}
      {!messageHelper && error?.message && (
        <p
          className={classNames(styles.error, {
            [styles.visibleError]: error?.message,
            [styles.hideError]: withoutErrorMessage,
          })}
          data-test-id={DataTestId.Hint}
        >
          {error?.message}
        </p>
      )}

      {label === 'password' && (
        <>
          {!error?.message && watchName && (
            <img
              className={styles.checkImg}
              src={Check}
              alt='check'
              data-test-id={DataTestId.CheckMark}
            />
          )}
          {watchName && (
            <img
              src={isOpenEye ? OpenEye : CloseEye}
              className={styles.eyeImg}
              alt='eye'
              onClick={changeIsOpenEye}
              role='presentation'
              data-test-id={isOpenEye ? DataTestId.EyeOpened : DataTestId.EyeClosed}
            />
          )}
        </>
      )}
    </label>
  )
}
