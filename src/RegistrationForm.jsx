import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authentic from './api/auth';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRequestAction } from './redux/action/userAction';

const RegistrationForm = () => {
  const navigate_page = useNavigate();
  const selector = useSelector(state => state);
  const { data } = useSelector(state => state.auth);
  // console.log("token from Registration Form", token)
  let show_popup = false;
  // console.log(selector, "selector")
  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem('Token')){
      navigate_page("/user")
    }
    
    // if(token){
    //   navigate_page("/user")
    // }

  }, [data])



  const [registerFormDetails, setRegisterFormDetails] = useState({
    name: {
      value: "",
      validate: false,
      erroMsg: ""
    },

    email: {
      value: "",
      validate: false,
      erroMsg: ""
    },

    password: {
      value: "",
      validate: false,
      erroMsg: ""
    }
  }
  )

  useEffect(() => {
    console.log(registerFormDetails)
  }, [registerFormDetails])

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterFormDetails({ ...registerFormDetails, [e.target.name]: { ...registerFormDetails[e.target.name], value: e.target.value } })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let res = false;
    if (registerFormDetails.name.value == "") {
      setRegisterFormDetails((prev) => (
        {
          ...prev,
          name: {
            ...prev.name,
            validate: true,
            erroMsg: "Please Enter name"
          }
        }
      ))
      res = true;
    }

    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(registerFormDetails.email.value)) == false) {
      setRegisterFormDetails((prev) => (
        {
          ...prev,
          email: {
            ...prev.email,
            validate: true,
            erroMsg: "Please Enter valid Email id"
          }
        }
      ))
      res = true;
    }

    if (registerFormDetails.email.value == "") {
      setRegisterFormDetails((prev) => (
        {
          ...prev,
          email: {
            ...prev.email,
            validate: true,
            erroMsg: "Please Enter Email id"
          }
        }
      ))
      res = true;
    }


    if (registerFormDetails.password.value == "") {
      setRegisterFormDetails((prev) => (
        {
          ...prev,
          password: {
            ...prev.password,
            validate: true,
            erroMsg: "Please enter a password"
          }
        }
      ))
      res = true;
    }
    if (registerFormDetails.password.value.length >= 1 && registerFormDetails.password.value.length < 6) {
      setRegisterFormDetails((prev) => (
        {
          ...prev,
          password: {
            ...prev.password,
            validate: true,
            erroMsg: "Password length should be greater than 6 characters"
          }
        }
      ))
      res = true
    }
    if (res == false) {
      let data = { name: registerFormDetails.name.value, email: registerFormDetails.email.value, password: registerFormDetails.password.value }
      //   authentic.register("http://localhost:5000/users/register", data, response => {
      //       if (response.status) {
      //         localStorage.setItem("Token", response.token);
      //         localStorage.setItem('data', response.record.name)
      //         // setTimeout(() => {

      //           navigate('/user')
      //         // }, 1500)
      //           // console.log(response.status, "status")
      //           // navigate('/user')
      //       }

      //   })

      // dispatch(fetchRequestAction('http://localhost:5000/users/register', data, response => {
      //   if(response.status){
      //     navigate('/user')
      //   }
      // }))

      dispatch(fetchRequestAction("http://localhost:5000/users/register", data))
      // if(selector.fetch.token){
      //   navigate('/user')
      // }

    }
    let reqData = { name: registerFormDetails.name.value, email: registerFormDetails.email.value, password: registerFormDetails.password.value }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // let data = { name:registerFormDetails.name.value, email: registerFormDetails.email.value, password: registerFormDetails.password.value }
    //   authentic.register("http://localhost:5000/users/register", data, response => {
    //       if (response.status) {
    //         localStorage.setItem("Token", response.token);
    //         localStorage.setItem('data', response.record.name)
    //         // setTimeout(() => {

    //           navigate('/user')
    //         // }, 1500)
    //           // console.log(response.status, "status")
    //           // navigate('/user')
    //       }

    //   })

  }

  // const register_post = () => {
  //   let reqData = { name:registerFormDetails.name.value, email:registerFormDetails.email.value, password:registerFormDetails.password.value }
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }

  //     authentic.register("http://localhost:5000/users/register", reqData, config, response=>{
  //       if(response.status){
  //         navigate_page('/user')
  //       }
  //     })
  // }

  return (
    <div className="form">
      <div className="wrapper">
        <div className='txt'>
          <h1>Registration Form</h1>
          <p className='heading-txt'>Please register yourself.</p>
        </div>
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-element input-box">
              <p className='form_section_p'>Email</p>
              <input className='input_type' type='text' placeholder="Enter your email" name='email' onChange={handleChange} />
              {
                registerFormDetails.email.validate ? <p style={{ color: "red" }}>{registerFormDetails.email.erroMsg}</p> : ""
              }
            </div>

            <div className="form-element input-box">
              <p className='form_section_p'>Name</p>
              <input className='input_type' type='text' placeholder="Enter your Name" name='name' onChange={handleChange} />
              {
                registerFormDetails.name.validate ? <p style={{ color: "red" }}>{registerFormDetails.name.erroMsg}</p> : ""
              }
            </div>

            <div className="form-element input-box">
              <p className='form_section_p'>Password</p>
              <input className='input_type' type="password" placeholder="******" name='password' onChange={handleChange} />
              {
                registerFormDetails.password.validate ? <p style={{ color: "red" }}>{registerFormDetails.password.erroMsg}</p> : ""
              }
            </div>

            <div className='form-element'>
              <button className='btn-color'>Register</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default RegistrationForm