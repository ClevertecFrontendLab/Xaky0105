export const formatDateButton = (dateString: string) => {
  if (!dateString) {
    return ''
  }
  const date = new Date(dateString)

  return new Intl.DateTimeFormat('ru-Ru', { day: '2-digit', month: '2-digit' }).format(date)
}

export const formatDateReview = (dateString: string) => {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat('ru-Ru', {
    day: '2-digit',
    year: 'numeric',
    month: 'long',
  }).format(date)
}
