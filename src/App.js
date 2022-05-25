import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './LoginPage'
import Image from './Image';
import RegistrationForm from './RegistrationForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Users from './Users';
import ProtectedRoute from './ProtectedRoute';

function App() {
  // const [shouldProtected, setshouldProtected] = useState(true)
  // useEffect(() => {
  //   localStorage.getItem('Token') ?
  //     setshouldProtected(false)
  //     :
  //     setshouldProtected(true)
  // }, [])

  return (
    <>
      <div className='layout'>
        <div className='login_page_css'>
          <Router>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/register' element={<RegistrationForm />} />
              <Route path='/user'
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route path='*' element={<LoginPage/>}></Route>
            </Routes>
          </Router>
        </div>
        <div className='image_page_css display_block'>
          <Image />
        </div>
      </div>

    </>
  );
}

export default App; 
