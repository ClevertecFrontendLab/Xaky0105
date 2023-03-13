import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../hooks/use-redux'
import { loginSelector } from '../../store/login/login.selector'
import { RoutePath } from '../../types/other'

export const PrivateRouter = () => {
  const { user } = useAppSelector(loginSelector)

  return user ? <Outlet /> : <Navigate to={RoutePath.authorization} />
}
