import { FC } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { LayoutMain } from '@/components/layout-main'

import { BookPage } from '@/pages/book'
import { MainPage } from '@/pages/main'
import { ProfilePage } from '@/pages/profile'
import { TermsPage } from '@/pages/terms'

import { RoutePath } from '@/types/other'

export const AppRouter: FC = () => (
  <HashRouter>
    <Routes>
      <Route path={RoutePath.main} element={<Layout />}>
        <Route element={<LayoutMain />}>
          <Route path={RoutePath.main} element={<Navigate to={RoutePath.booksAll} />} />
          <Route path={RoutePath.booksCategory} element={<MainPage />} />
          <Route path={RoutePath.terms} element={<TermsPage contentView='terms' />} />
          <Route path={RoutePath.contract} element={<TermsPage contentView='contract' />} />
        </Route>
        <Route path={RoutePath.bookPage} element={<BookPage />} />
        <Route path={RoutePath.profile} element={<ProfilePage />} />
      </Route>
    </Routes>
  </HashRouter>
)
