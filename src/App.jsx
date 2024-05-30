import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/login/login'; 
import RegisterPage from './pages/register/register'; 
import ForgetPassword from './pages/forgetPassword/forgetPassword';
import Profile from './pages/profile/profile';
import Otp from './pages/otp/otp'
import EmailForget from './pages/emailForgetPassword/emailForgetPassword'

function App() {
    return (
        <Router>
            <Routes> 
                <Route path="/login" element={<LoginPage />} /> 
                <Route path="/register" element={<RegisterPage />} /> 
                <Route path="/forgetpassword" element={<ForgetPassword />} /> 
                <Route path="/profile" element={<Profile />} /> 
                <Route path="/otp" element={<Otp />} /> 
                <Route path="/email" element={<EmailForget />} />
            </Routes>
        </Router>
    );
}

export default App;
