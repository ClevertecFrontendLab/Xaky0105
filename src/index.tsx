import React from 'react'
import ReactDOM from 'react-dom/client'

import 'swiper/css/bundle'

import { AppRouter } from './app-router'

import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
