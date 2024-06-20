import { useSelector } from "react-redux";
import Header from "./components/Header";
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import EditProfile from "./pages/EditProfile.jsx";
import UsersList from "./pages/UsersList.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditUser from "./pages/EditUser.jsx";


function App() {
  const user = useSelector(state => state.auth.user);

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to='/'/> :<LoginPage /> } />
        <Route path="/register" element={user ? <Navigate to='/'/> : <RegisterPage />} />
        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/users-edit/:userid" element={<EditUser />} />
        </Route>
      </Routes>

      <ToastContainer/>
    </>
  );
}

const PrivateRoutes = () => {
  const user = useSelector(state => state.auth.user);
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to='/login' state={{from : location.pathname}}/>;
}

export default App
