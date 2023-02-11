export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat('ru-Ru').format(date)
}
