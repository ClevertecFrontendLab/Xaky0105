import { UserType } from '../../types/auth'
import { LoginRequestErrors } from '../../types/errors'

export type LoginState = {
  user: UserType | null
  isLoading: boolean
  error: LoginRequestErrors | null
}
