import { HTMLInputTypeAttribute, MouseEvent, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { FieldError, UseFormClearErrors } from 'react-hook-form/dist/types'
import InputMask from 'react-input-mask'
import classNames from 'classnames'

import { DataTestId } from '../../../types/other'
import { HintError } from '../../hint-error'

import Check from './assets/check-icon.svg'
import CloseEye from './assets/close-eye-icon.svg'
import OpenEye from './assets/open-eye-icon.svg'

import styles from './custom-input.module.scss'

type CustomFieldProps = {
  label: string
  register: UseFormRegisterReturn
  placeholder: string
  watchName: string
  messageHelper?: string
  error?: FieldError
  type: HTMLInputTypeAttribute
  withoutErrorMessage?: boolean
  mask?: string
  maskPlaceholder?: string
  errors?: string[]
  shouldFullColorError?: boolean
  clearErrors?: UseFormClearErrors<any>
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
  errors,
  shouldFullColorError,
  clearErrors,
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
          onFocus={() => clearErrors && clearErrors()}
        />
      ) : (
        <input
          className={classNames(styles.input, { [styles.inputError]: error?.message })}
          {...register}
          type={isOpenEye ? 'text' : type}
          onFocus={() => clearErrors && clearErrors()}
        />
      )}

      <span className={classNames(styles.placeholder, { [styles.fixed]: watchName })}>
        {placeholder}
      </span>
      {errors && error?.type !== 'required' && (
        <HintError
          errorsArr={errors}
          dataTestId={DataTestId.Hint}
          hintType={label}
          shouldShowError={!!watchName}
          shouldFullColorError={shouldFullColorError!}
        />
      )}

      {!messageHelper && !errors && error?.message && label !== 'phone' && (
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

      {!messageHelper &&
        errors &&
        error?.message &&
        error.type === 'required' &&
        label !== 'phone' && (
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

      {label === 'phone' && (
        <p
          className={classNames(styles.errorPhone, {
            [styles.active]: error?.message,
            [styles.hideError]: withoutErrorMessage,
          })}
          data-test-id={DataTestId.Hint}
        >
          {error?.message ? error.message : messageHelper}
        </p>
      )}

      {!error?.message && !errors?.length && watchName && label === 'password' && (
        <img
          className={styles.checkImg}
          src={Check}
          alt='check'
          data-test-id={DataTestId.CheckMark}
        />
      )}
      {watchName && (label === 'password' || label === 'passwordConfirmation') && (
        <img
          src={isOpenEye ? OpenEye : CloseEye}
          className={styles.eyeImg}
          alt='eye'
          onClick={changeIsOpenEye}
          role='presentation'
          data-test-id={isOpenEye ? DataTestId.EyeOpened : DataTestId.EyeClosed}
        />
      )}
    </label>
  )
}
