import React from 'react';
import './Users.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchFailure } from './redux/action/userAction';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(fetchFailure())
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