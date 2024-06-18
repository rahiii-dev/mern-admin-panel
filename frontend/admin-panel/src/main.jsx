import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index={true} element={<HomePage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
