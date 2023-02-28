import { RegistrationRequestErrors } from '../../types/errors'

export type RegistrationState = {
  isLoading: boolean
  isSuccess: boolean
  error: RegistrationRequestErrors | null
}
