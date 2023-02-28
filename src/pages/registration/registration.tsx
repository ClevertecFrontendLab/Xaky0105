import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'

import Chevron from '../../assets/images/icon-chevron.svg'
import { Loader } from '../../components/loader'
import { ModalCompound } from '../../components/modal-compound'
import { OverlayWithPortal } from '../../components/overlay-with-portal'
import { Button } from '../../components/ui/button'
import { CustomInput } from '../../components/ui/custom-input'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { registrationSelector } from '../../store/registration/registration.selector'
import {
  clearRegistrationData,
  getRegistrationRequest,
} from '../../store/registration/registration.slice'
import { RegistrationFieldsType } from '../../types/auth'
import { RegistrationRequestErrors } from '../../types/errors'
import { BtnType, DataTestId, RoutePath, Size } from '../../types/other'
import { btnRegistrationMessage, selectRegistrationSchema } from '../../utils/registration'

import styles from './registration.module.scss'

export const RegistrationPage = () => {
  const [registrationStep, setRegistrationStep] = useState(1)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { error, isLoading, isSuccess } = useAppSelector(registrationSelector)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegistrationFieldsType>({
    mode: 'all',
    resolver: yupResolver(selectRegistrationSchema(registrationStep)),
    shouldFocusError: false,
  })

  const onSubmit: SubmitHandler<RegistrationFieldsType> = data => {
    if (registrationStep < 3) {
      setRegistrationStep(prevStep => prevStep + 1)
    }
    if (registrationStep === 3 && !error && !isSuccess) {
      dispatch(getRegistrationRequest(data))
    }
    if (isSuccess) {
      dispatch(clearRegistrationData())
      navigate(RoutePath.authorization)
    }
    if (error) {
      dispatch(clearRegistrationData())
      reset()
      setRegistrationStep(1)
    }
  }

  return (
    <>
      {error && (
        <ModalCompound dataTestId={DataTestId.StatusBlock}>
          <h1 className={classNames(styles.title, styles.center)}>Данные не сохранились</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className={styles.message}>
              {error === RegistrationRequestErrors.registrationSmthError
                ? RegistrationRequestErrors.registrationSmthError
                : RegistrationRequestErrors.registrationLoginAndEmailNotUnique}
            </p>
            <Button
              clickHandler={() => onSubmit}
              name={
                error === RegistrationRequestErrors.registrationSmthError
                  ? 'Повторить'
                  : 'Назад к регистрации'
              }
              size={Size.large}
              type={BtnType.submit}
            />
          </form>
        </ModalCompound>
      )}
      {isSuccess && (
        <ModalCompound dataTestId={DataTestId.StatusBlock}>
          <h1 className={classNames(styles.title, styles.center)}>Регистрация успешна</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className={styles.message}>
              Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль
            </p>
            <Button
              clickHandler={() => onSubmit}
              name='Вход'
              size={Size.large}
              type={BtnType.submit}
            />
          </form>
        </ModalCompound>
      )}

      {!error && !isSuccess && (
        <ModalCompound>
          <h1 className={styles.title}>Регистрация</h1>
          <div className={styles.step}>{registrationStep} шаг из 3</div>
          <form onSubmit={handleSubmit(onSubmit)} data-test-id={DataTestId.RegisterForm}>
            <div className={styles.inputGroup}>
              {registrationStep === 1 && (
                <>
                  <CustomInput
                    label='login'
                    register={register('username')}
                    messageHelper='Используйте для логина латинский алфавит и цифры'
                    error={errors.username}
                    placeholder='Придумайте логин для входа'
                    watchName={watch('username')}
                    type='text'
                  />
                  <CustomInput
                    label='password'
                    register={register('password')}
                    messageHelper='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    error={errors.password}
                    placeholder='Пароль'
                    watchName={watch('password')}
                    type='password'
                  />
                </>
              )}
              {registrationStep === 2 && (
                <>
                  <CustomInput
                    label='firstName'
                    register={register('firstName')}
                    error={errors.firstName}
                    placeholder='Имя'
                    watchName={watch('firstName')}
                    type='text'
                  />
                  <CustomInput
                    label='lastName'
                    register={register('lastName')}
                    error={errors.lastName}
                    placeholder='Фамилия'
                    watchName={watch('lastName')}
                    type='text'
                  />
                </>
              )}
              {registrationStep === 3 && (
                <>
                  <CustomInput
                    label='phone'
                    register={register('phone')}
                    messageHelper='В формате +375 (xx) xxx-xx-xx'
                    error={errors.phone}
                    placeholder='Номер телефона'
                    watchName={watch('phone')}
                    type='text'
                    mask='+375 (99) 999-99-99'
                    maskPlaceholder='x'
                  />
                  <CustomInput
                    label='email'
                    register={register('email')}
                    error={errors.email}
                    placeholder='E-mail'
                    watchName={watch('email')}
                    type='email'
                  />
                </>
              )}
            </div>
            <Button
              clickHandler={() => onSubmit}
              name={btnRegistrationMessage(registrationStep)}
              size={Size.large}
              type={BtnType.submit}
              isDisabled={!!errors.firstName || !!errors.lastName}
            />
          </form>
          <div className={styles.navigateToAnotherRoute}>
            <div className={styles.navigationText}>Есть учетная запись?</div>
            <Link className={styles.navigationLink} to={RoutePath.authorization}>
              Войти
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
    </>
  )
}
