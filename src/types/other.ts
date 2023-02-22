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
  Card = 'card',
  Loader = 'loader',
  NavigationShowcase = 'navigation-showcase',
  BurgerShowcase = 'burger-showcase',
  NavigationTerms = 'navigation-terms',
  BurgerTerms = 'burger-terms',
  NavigationContract = 'navigation-contract',
  BurgerContract = 'burger-contract',
  NavigationBooks = 'navigation-books',
  BurgerBooks = 'burger-books',
  BurgerNavigation = 'burger-navigation',
  ButtonHideReviews = 'button-hide-reviews',
  ButtonRating = 'button-rating',
  ButtonBurger = 'button-burger',
  SlideBig = 'slide-big',
  SlideMini = 'slide-mini',
  ButtonMenuViewWindow = 'button-menu-view-window',
  ButtonMenuViewList = 'button-menu-view-list',
  ButtonSearchOpen = 'button-search-open',
  InputSearch = 'input-search',
  ButtonSearchClose = 'button-search-close',
  Error = 'error',
  SearchResultNotFound = 'search-result-not-found',
  EmptyCategory = 'empty-category',
  SortRatingButton = 'sort-rating-button',
  BreadcrumbsLink = 'breadcrumbs-link',
  BookName = 'book-name',
  BookTitle = 'book-title',
  HighLightMatches = 'highlight-matches',
}
