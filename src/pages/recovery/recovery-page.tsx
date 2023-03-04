import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'

import Chevron from '../../assets/images/icon-chevron.svg'
import ChevronGray from '../../assets/images/icon-chevron-gray.svg'
import { Loader } from '../../components/loader'
import { ModalCompound } from '../../components/modal-compound'
import { OverlayWithPortal } from '../../components/overlay-with-portal'
import { Button } from '../../components/ui/button'
import { CustomInput } from '../../components/ui/custom-input'
import { useErrors } from '../../hooks/use-errors'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { recoverySelector } from '../../store/recovery/recovery.selector'
import {
  getForgotPasswordRequest,
  getResetPasswordRequest,
} from '../../store/recovery/recovery.slice'
import { RecoveryFieldType } from '../../types/auth'
import { BtnType, DataTestId, RoutePath, Size } from '../../types/other'
import { forgotPasswordSchema, resetPasswordSchema } from '../../validation/scheme'

import styles from './recovery-page.module.scss'

export const RecoveryPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { isLoading, isResetSuccess, isForgotSuccess, error } = useAppSelector(recoverySelector)

  const code = search.split('=')[1]

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<RecoveryFieldType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(code ? resetPasswordSchema : forgotPasswordSchema),
    shouldFocusError: false,
  })

  const onSubmit: SubmitHandler<RecoveryFieldType> = data => {
    if (code) {
      dispatch(
        getResetPasswordRequest({
          code,
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
        })
      )
    }
    if (!code) {
      dispatch(getForgotPasswordRequest(data))
    }
    if (error && code) {
      dispatch(
        getResetPasswordRequest({
          code,
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
        })
      )
    }
  }

  const { errorsArr } = useErrors(resetPasswordSchema, watch('password'), 'password')

  return (
    <>
      {code && !isResetSuccess && !error && (
        <ModalCompound>
          <h1 className={styles.title}>Восстановление пароля</h1>
          <form onSubmit={handleSubmit(onSubmit)} data-test-id={DataTestId.ResetPasswordForm}>
            <div className={styles.inputGroup}>
              <CustomInput
                label='password'
                register={register('password')}
                error={errors.password}
                placeholder='Новый пароль'
                watchName={watch('password')}
                type='password'
                errors={errorsArr}
                clearErrors={clearErrors}
              />
              <CustomInput
                label='passwordConfirmation'
                register={register('passwordConfirmation')}
                error={errors.passwordConfirmation}
                placeholder='Повторите пароль'
                watchName={watch('passwordConfirmation')}
                type='password'
                clearErrors={clearErrors}
              />
            </div>
            <Button
              clickHandler={() => onSubmit}
              name='Сохранить изменения'
              size={Size.large}
              type={BtnType.submit}
              isDisabled={!!errors.passwordConfirmation}
            />
          </form>
          <p className={styles.message}>
            После сохранения войдите в библиотеку, используя новый пароль
          </p>
        </ModalCompound>
      )}
      {!code && !isForgotSuccess && !isResetSuccess && (
        <ModalCompound>
          <div className={styles.topNavigate}>
            <Link to={RoutePath.authorization}>
              <img src={ChevronGray} alt='chevron' />
            </Link>
            Вход в личный кабинет
          </div>
          <h1 className={styles.title}>Восстановление пароля</h1>
          <form onSubmit={handleSubmit(onSubmit)} data-test-id={DataTestId.SendEmailForm}>
            <div className={styles.inputGroup}>
              <CustomInput
                label='email'
                register={register('email')}
                error={errors.email}
                placeholder='Email'
                watchName={watch('email')}
                type='email'
                clearErrors={clearErrors}
              />
              {error && (
                <p className={styles.hintError} data-test-id={DataTestId.Hint}>
                  {error}
                </p>
              )}
              <p className={styles.hint}>
                На это email будет отправлено письмо с инструкциями по восстановлению пароля
              </p>
            </div>
            <Button
              clickHandler={() => onSubmit}
              name='Восстановить'
              size={Size.large}
              type={BtnType.submit}
            />
          </form>
          <div className={styles.navigateToAnotherRoute}>
            <div className={styles.navigationText}>Нет учетной записи?</div>
            <Link className={styles.navigationLink} to={RoutePath.registration}>
              Регистрация
              <img src={Chevron} alt='chevron' />
            </Link>
          </div>
        </ModalCompound>
      )}
      {isLoading && (
        <OverlayWithPortal>
          <Loader />
        </OverlayWithPortal>
      )}
      {isForgotSuccess && !code && (
        <ModalCompound dataTestId={DataTestId.StatusBlock}>
          <h1 className={classNames(styles.title, styles.center)}>Письмо выслано</h1>
          <p className={styles.messageCenter}>
            Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
          </p>
        </ModalCompound>
      )}
      {isResetSuccess && code && (
        <ModalCompound dataTestId={DataTestId.StatusBlock}>
          <h1 className={classNames(styles.title, styles.center)}>Новые данные сохранены</h1>
          <p className={styles.messageCenter}>
            Зайдите в личный кабинет, используя свои логин и новый пароль
          </p>
          <Button
            clickHandler={() => navigate(RoutePath.authorization)}
            name='Вход'
            size={Size.large}
            type={BtnType.button}
          />
        </ModalCompound>
      )}
      {error && code && (
        <ModalCompound dataTestId={DataTestId.StatusBlock}>
          <h1 className={classNames(styles.title, styles.center)}>Данные не сохранились</h1>
          <p className={styles.messageCenter}>{error}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button
              clickHandler={() => onSubmit}
              name='Повторить'
              size={Size.large}
              type={BtnType.submit}
            />
          </form>
        </ModalCompound>
      )}
    </>
  )
}
