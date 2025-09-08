// import { BrowserRouter as Route, Routes } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import ForgetPassword from './components/forget-password/ForgetPassword';
import ResetPassword from './components/reset-password/ResetPassword.js';
import Home from './pages/Home.js'
import Employees from './pages/Employees.js';
import AppLayout from './layouts/AppLayout.js';
import AuthLayout from './layouts/AuthLayout.js';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Routes>
        
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-pass" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
