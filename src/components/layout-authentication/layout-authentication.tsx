import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../hooks/use-redux'
import { loginSelector } from '../../store/login/login.selector'
import { DataTestId, RoutePath } from '../../types/other'

import styles from './layout-authentication.module.scss'

export const LayoutAuthentication = () => {
  const { user } = useAppSelector(loginSelector)
  const navigation = useNavigate()

  useEffect(() => {
    if (user) {
      navigation(RoutePath.booksAll)
    }
  }, [user, navigation])

  return (
    <div className={styles.layoutAuthentication} data-test-id={DataTestId.Auth}>
      <div className={styles.title}>Cleverland</div>
      <Outlet />
    </div>
  )
}
