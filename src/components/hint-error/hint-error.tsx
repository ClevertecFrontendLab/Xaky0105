import classNames from 'classnames'

import { ErrorsMessages } from '../../types/errors'
import { DataTestId } from '../../types/other'

import styles from './hint-error.module.scss'

type HintErrorProps = {
  dataTestId: DataTestId
  errorsArr: string[]
  hintType: string
  shouldShowError: boolean
  shouldFullColorError: boolean
}

export const HintError = ({
  dataTestId,
  errorsArr,
  hintType,
  shouldShowError,
  shouldFullColorError,
}: HintErrorProps) => (
  <>
    {hintType === 'password' && (
      <p
        className={classNames(styles.hint, { [styles.fullColor]: shouldFullColorError })}
        data-test-id={dataTestId}
      >
        Пароль{' '}
        <span
          className={classNames(styles.highlight, {
            [styles.active]:
              errorsArr.includes(ErrorsMessages.atLeastEightCharacters) && shouldShowError,
          })}
        >
          {ErrorsMessages.atLeastEightCharacters}
        </span>
        ,{' '}
        <span
          className={classNames(styles.highlight, {
            [styles.active]: errorsArr.includes(ErrorsMessages.withUpperLater) && shouldShowError,
          })}
        >
          {ErrorsMessages.withUpperLater}
        </span>{' '}
        и{' '}
        <span
          className={classNames(styles.highlight, {
            [styles.active]: errorsArr.includes(ErrorsMessages.withNumber) && shouldShowError,
          })}
        >
          {ErrorsMessages.withNumber}
        </span>
      </p>
    )}
    {hintType === 'username' && (
      <p
        className={classNames(styles.hint, { [styles.fullColor]: shouldFullColorError })}
        data-test-id={dataTestId}
      >
        Используйте для логина{' '}
        <span
          className={classNames(styles.highlight, {
            [styles.active]: errorsArr.includes('латинский алфавит') && shouldShowError,
          })}
        >
          латинский алфавит
        </span>{' '}
        и{' '}
        <span
          className={classNames(styles.highlight, {
            [styles.active]: errorsArr.includes('цифры') && shouldShowError,
          })}
        >
          цифры
        </span>
      </p>
    )}
  </>
)
