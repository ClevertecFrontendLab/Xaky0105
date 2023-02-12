import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import 'swiper/css/bundle'

import { AppRouter } from './app-router'
import { store } from './store'

import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AppRouter />
  </Provider>
  // </React.StrictMode>
)
