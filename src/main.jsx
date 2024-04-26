import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter,HashRouter } from "react-router-dom"

import "@fontsource/outfit"
import "@fontsource/roboto"

ReactDOM.createRoot(document.getElementById('root')).render(
  // github pages刷新页面报错（404）,改成HashRouter
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>
)
