export enum TypeSortMainPage {
  list = 'list',
  tile = 'tile',
}

export enum RoutePath {
  main = '/',
  booksAll = '/books/all',
  booksCategory = '/books/:category',
  terms = '/terms',
  contract = '/contract',
  bookPage = '/books/:category/:bookId',
  profile = '/profile',
}

export enum Pages {
  books = 'books',
  terms = 'terms',
  contract = 'contract',
  profile = 'profile',
}

export enum RequestErrors {
  smthWrong = 'Что-то пошло не так. Обновите страницу через некоторое время',
}

export enum ToastVariant {
  positive = 'positive',
  negative = 'negative',
}

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum BtnVariant {
  secondary = 'secondary',
  primary = 'primary',
}

export enum NavType {
  mobile = 'mobile',
  desktop = 'desktop',
}

export enum OverlayType {
  orange = 'orange',
  blur = 'blur',
  transparent = 'transparent',
}

export enum BtnType {
  button = 'button',
  submit = 'submit',
}

export enum AllBooks {
  name = 'Все книги',
  path = 'all',
}

export enum TermContentView {
  terms = 'terms',
  contract = 'contract',
}

export enum DataTestId {
  card = 'card',
  loader = 'loader',
  'navigation-showcase' = 'navigation-showcase',
  'burger-showcase' = 'burger-showcase',
  'navigation-terms' = 'navigation-terms',
  'burger-terms' = 'burger-terms',
  'navigation-contract' = 'navigation-contract',
  'burger-contract' = 'burger-contract',
  'navigation-books' = 'navigation-books',
  'burger-books' = 'burger-books',
  'burger-navigation' = 'burger-navigation',
  'button-hide-reviews' = 'button-hide-reviews',
  'button-rating' = 'button-rating',
  'button-burger' = 'button-burger',
  'slide-big' = 'slide-big',
  'slide-mini' = 'slide-mini',
  'button-menu-view-window' = 'button-menu-view-window',
  'button-menu-view-list' = 'button-menu-view-list',
  'button-search-open' = 'button-search-open',
  'input-search' = 'input-search',
  'button-search-close' = 'button-search-close',
  'error' = 'error',
}
