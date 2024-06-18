import { useSelector } from "react-redux";
import Header from "./components/Header";
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const user = useSelector(state => state.auth.user);

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to='/'/> :<LoginPage /> } />
        <Route path="/register" element={user ? <Navigate to='/'/> : <RegisterPage />} />
      </Routes>
    </>
  );
}

export default App
