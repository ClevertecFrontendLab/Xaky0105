export enum RequestErrors {
  smthWrong = 'Что-то пошло не так. Обновите страницу через некоторое время',
}

export enum RegistrationRequestErrors {
  registrationLoginAndEmailNotUnique = 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
  registrationSmthError = 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
}

export enum LoginRequestErrors {
  wrongLoginOrPassword = 'Неверный логин или пароль!',
  loginSmthError = 'Что-то пошло не так. Попробуйте еще раз',
}

export enum RecoveryRequestErrors {
  requestSmthError = 'Что-то пошло не так. Попробуйте еще раз',
}
