export const errorHandler = (message: string) => {
  switch (message) {
    case 'Request failed with status code 404':
      return 'Что-то пошло не так. Обновите страницу через некоторое время'

    default:
      return message
  }
}
