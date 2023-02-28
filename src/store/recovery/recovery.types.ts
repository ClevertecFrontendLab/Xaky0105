import { RecoveryRequestErrors } from '../../types/errors'

export type RecoveryState = {
  isLoading: boolean
  isForgotSuccess: boolean
  isResetSuccess: boolean
  error: RecoveryRequestErrors | string | null
}
