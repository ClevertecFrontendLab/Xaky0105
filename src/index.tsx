import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { AppRouter } from './app-router'
import { store } from './store'

import './index.scss'

import 'swiper/css/bundle'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
)
