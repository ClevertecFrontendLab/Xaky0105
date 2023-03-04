import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from './components/layout'
import { LayoutAuthentication } from './components/layout-authentication'
import { LayoutMain } from './components/layout-main'
import { PrivateRouter } from './components/private-router'
import { AuthorizationPage } from './pages/authorization'
import { BookPage } from './pages/book'
import { MainPage } from './pages/main'
import { ProfilePage } from './pages/profile'
import { RecoveryPage } from './pages/recovery'
import { RegistrationPage } from './pages/registration'
import { TermsPage } from './pages/terms'
import { RoutePath, TermContentView } from './types/other'

export const AppRouter = () => (
  <HashRouter>
    <Routes>
      <Route element={<LayoutAuthentication />}>
        <Route path={RoutePath.registration} element={<RegistrationPage />} />
        <Route path={RoutePath.authorization} element={<AuthorizationPage />} />
        <Route path={RoutePath.recovery} element={<RecoveryPage />} />
      </Route>
      <Route element={<PrivateRouter />}>
        <Route path={RoutePath.main} element={<Layout />}>
          <Route element={<LayoutMain />}>
            <Route path={RoutePath.main} element={<Navigate to={RoutePath.booksAll} />} />
            <Route path={RoutePath.booksCategory} element={<MainPage />} />
            <Route
              path={RoutePath.terms}
              element={<TermsPage contentView={TermContentView.terms} />}
            />
            <Route
              path={RoutePath.contract}
              element={<TermsPage contentView={TermContentView.contract} />}
            />
          </Route>
          <Route path={RoutePath.bookPage} element={<BookPage />} />
          <Route path={RoutePath.profile} element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
)
