import React from 'react';
import './Users.css';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate()
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/')
  }
  return (
    <div className='user_box'>
        <h1>Welcome,{localStorage.getItem('data')}</h1>
        <p>You are Successfully Logged in ;)</p>

        <br />
        <button onClick={logout} style={{backgroundColor:'red', padding:'3px', color: 'white'}}>Logout</button>
    </div>
  )
}

export default Users