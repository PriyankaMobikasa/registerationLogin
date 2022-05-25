import React, { useState, useEffect } from 'react'
import google from './assets/google-icon.png';
import './loginPage.css';
import './image.css';
import side from './assets/side.jpg';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
// import axios from './api/axios';
import axios from 'axios';
import authentic from './api/auth';


const LoginPage = () => {
    const navigate_page = useNavigate()

    const google_id = "324489282442-45202uefkq3jm1n42hvc3cp712ef6pnc.apps.googleusercontent.com";
    const [loginFormDetails, setLoginFormDetails] = useState({
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
        console.log(loginFormDetails)
    }, [loginFormDetails])

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginFormDetails({ ...loginFormDetails, [e.target.name]: { ...loginFormDetails[e.target.name], value: e.target.value } })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let res = false;
        if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(loginFormDetails.email.value)) == false) {
            setLoginFormDetails((prev) => (
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

        if (loginFormDetails.email.value == "") {
            setLoginFormDetails((prev) => (
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

        if (loginFormDetails.password.value == "") {
            setLoginFormDetails((prev) => (
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
        if (loginFormDetails.password.value.length >= 1 && loginFormDetails.password.value.length < 6) {
            setLoginFormDetails((prev) => (
                {
                    ...prev,
                    password: {
                        ...prev.password,
                        validate: true,
                        erroMsg: "Password length should be greater than 6 characters"
                    }
                }
            ))
            res = true;
        }
        if (res == false) {
            let data = { email: loginFormDetails.email.value, password: loginFormDetails.password.value }
            authentic.login("http://localhost:5000/users/login", data, response => {
                if (response.status) {
                    localStorage.setItem("Token", response.token);
                    localStorage.setItem('data', response.record.name)
                    navigate('/user')
                }
                else {
                    console.log(response.message)
                    alert(response.message)
                }
            })
        }

        // let data = { email: loginFormDetails.email.value, password: loginFormDetails.password.value }
        // authentic.login("http://localhost:5000/users/login", data, response => {
        //     if (response.status) {
        //         localStorage.setItem("Token", response.token);
        //         localStorage.setItem('data', response.record.name)
        //             navigate('/user')
        //     }
        //     else{
        //         console.log(response.message)
        //         alert(response.message)
        //     }
        // })
    }

    const googleSuccess = (logdata) => {
        console.log(logdata, "logdata");
    }

    const googleFailure = () => {

    }

    return (
        <>
            <div className="form">
                <div className="wrapper">
                    <div className='txt'>
                        <h1>Welcome back</h1>
                        <p className='heading-txt'>Welcome back! Please enter your details.</p>
                    </div>
                    <div className="form-section">
                        <form onSubmit={handleSubmit}>

                            <div className="form-element input-box">
                                <p className='form_section_p'>Email</p>
                                <input className='input_type' type='text' placeholder="Enter your email" name='email' onChange={handleChange} />
                                {
                                    loginFormDetails.email.validate ? <p style={{ color: "red" }}>{loginFormDetails.email.erroMsg}</p> : ""
                                }
                            </div>
                            <div className="form-element input-box">
                                <p className='form_section_p'>Password</p>
                                <input className='input_type' type="password" placeholder="******" name='password' onChange={handleChange} />
                                {
                                    loginFormDetails.password.validate ? <p style={{ color: "red" }}>{loginFormDetails.password.erroMsg}</p> : ""
                                }
                            </div>
                            <div className='check_layout'>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex check-set'>
                                        <input type="checkbox" id='check' className='check' /><label htmlFor='check' className='rem_label'>Remember me</label>
                                    </div>

                                    <div>
                                        <p>Forgot password</p>
                                    </div>

                                </div>
                            </div>
                            <div className='form-element'>
                                <button className='btn-color' >Sign in</button>
                            </div>
                        </form>
                        <div className='form-element'>
                            {/* <button className='btn-without-color'> */}
                            <GoogleLogin
                                clientId={google_id}
                                render={renderProps => (
                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}><span><img src={google}></img></span>Sign in with Google</button>
                                )}
                                buttonText="Login"
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy={'single_host_origin'}
                            />
                            {/* </button> */}
                            {/* <button className='btn-without-color'><span><img src="http://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png"></img></span>Sign in with Google</button> */}
                        </div>
                        <div className='form-element'>
                            <div className='signUp-text'>
                                <span>Don’t have an account?</span> <span className='sign_up_color' onClick={() => navigate("register")}>Sign up fo free!</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default LoginPage;