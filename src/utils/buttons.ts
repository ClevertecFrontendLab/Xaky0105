import { BookingType } from '@/types/books'

import { formatDateButton } from './date'

export const buttonBookingMessage = (booking: BookingType | null) => {
  if (booking?.dateOrder) {
    return `Занята до ${formatDateButton(booking.dateOrder)}`
  }

  return 'Забронировать'
}
