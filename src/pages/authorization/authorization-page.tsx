import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'

import Chevron from '../../assets/images/icon-chevron.svg'
import { Loader } from '../../components/loader'
import { ModalCompound } from '../../components/modal-compound'
import { OverlayWithPortal } from '../../components/overlay-with-portal'
import { Button } from '../../components/ui/button'
import { CustomInput } from '../../components/ui/custom-input'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { loginSelector } from '../../store/login/login.selector'
import { getLoginRequest } from '../../store/login/login.slice'
import { LoginFieldsType } from '../../types/auth'
import { LoginRequestErrors } from '../../types/errors'
import { BtnType, DataTestId, RoutePath, Size } from '../../types/other'
import { loginSchema } from '../../validation/scheme'

import styles from './authorization-page.module.scss'

export const AuthorizationPage = () => {
  const { error, user, isLoading } = useAppSelector(loginSelector)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFieldsType>({
    mode: 'all',
    resolver: yupResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginFieldsType> = data => {
    dispatch(getLoginRequest(data))
  }

  return (
    <>
      {error !== LoginRequestErrors.loginSmthError && !user && (
        <ModalCompound>
          <h1 className={styles.title}>Вход в личный кабинет</h1>
          <form onSubmit={handleSubmit(onSubmit)} data-test-id={DataTestId.AuthForm}>
            <div className={styles.inputGroup}>
              <CustomInput
                label='identifier'
                register={register('identifier')}
                error={errors.identifier}
                placeholder='Логин'
                watchName={watch('identifier')}
                type='text'
                withoutErrorMessage={!errors.identifier}
              />
              <CustomInput
                label='password'
                register={register('password')}
                error={errors.password}
                placeholder='Пароль'
                watchName={watch('password')}
                type='password'
                withoutErrorMessage={!errors.password}
              />
              <p
                className={classNames(styles.errorMessage, {
                  [styles.visibleError]: error === LoginRequestErrors.wrongLoginOrPassword,
                })}
                data-test-id={DataTestId.Hint}
              >
                {LoginRequestErrors.wrongLoginOrPassword}
              </p>
              <Link className={styles.navigation} to={RoutePath.recovery}>
                {error === LoginRequestErrors.wrongLoginOrPassword
                  ? 'Восстановить?'
                  : 'Забыли логин или пароль?'}
              </Link>
            </div>
            <Button
              clickHandler={() => onSubmit}
              name='Вход'
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
      {error === LoginRequestErrors.loginSmthError && (
        <ModalCompound dataTestId={DataTestId.StatusBlock}>
          <h1 className={classNames(styles.title, styles.center)}>Вход не выполнен</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className={styles.message}>{LoginRequestErrors.loginSmthError}</p>
            <Button
              clickHandler={() => onSubmit}
              name='Повторить'
              size={Size.large}
              type={BtnType.submit}
            />
          </form>
        </ModalCompound>
      )}
      {isLoading && (
        <OverlayWithPortal>
          <Loader />
        </OverlayWithPortal>
      )}
    </>
  )
}
