import React, { Component, useState } from 'react';
import './login.css';
export function Login() {

    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const handlePassword = (e) => {
        setPassword(e.target.value);
        console.log(Password);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
        console.log(Email);
    };
    const handleSubmit = async (e) => {
        if (Email == "Admin" && Password=="Admin")
        {
            sessionStorage.setItem("usertype", "admin");
            sessionStorage.setItem("usertoken", "Admin");
            window.location.replace("https://localhost:44475/AdminHome");
            return;
        }
        if (Email == "" || Password == "") {
            alert("All fields are mandatory");
            return;
        }
        const res = await fetch('https://localhost:7275/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: Email,
                Password: Password,
            })


        });
        if (res.status == 200) {
            sessionStorage.setItem("usertype", "user");
            sessionStorage.setItem("usertoken", Email);
            alert("Login successfull");
            window.location.replace("https://localhost:44475/UserHome");
        }
        else if (res.status == 404) {
            alert("Invalid email or password");
            sessionStorage.setItem("usertoken", "invalid");
        }
    }
    const goToRegistration = () => {
        window.location.replace("https://localhost:44475/Registration");
    }
    const goToForgotPassword = () => {
        window.location.replace("https://localhost:44475/Forgotpassword");
    }
    return (

        <div id="main-wrapper" class="container">
            <div class="row justify-content-center">
                <div class="col-xl-10">
                    <div class="card border-0">
                        <div class="card-body p-0">
                            <div class="row no-gutters">
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="mb-5">
                                            <h3 class="h4 font-weight-bold text-theme">Login</h3>
                                        </div>

                                        <h6 class="h5 mb-0">Welcome back!</h6>
                                        <p class="mt-2 mb-5">Enter your email address and password to continue</p>

                                       
                                        <div class="form-outline mb-4 col-sm-11">
                                            <input onChange={handleEmail} value={Email} type="email" class="form-control" placeholder="Email Address" required />
                                        </div>
                                        <div class="form-outline mb-4 col-sm-11">
                                            <input onChange={handlePassword} value={Password} type="password" class="form-control" placeholder="Password" required />
                                        </div>
                                            <button onClick={handleSubmit} type="submit" class="btn btn-theme">Login</button>
                                    
                                    </div>
                                </div>

                                <div class="col-lg-6 d-none d-lg-inline-block">
                                    <div class="account-block rounded-right">
                                        <div class="overlay rounded-right"></div>
                                        <div class="account-testimonial">
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                    <p class="text-muted text-center mt-3 mb-0">Don't have an account? <a onClick={goToRegistration} class="text-primary ml-1">register</a></p>
                    <p class="text-muted text-center mt-3 mb-0">Don't remember password? <a onClick={goToForgotPassword} class="text-primary ml-1">forgot password?</a></p>


                </div>

            </div>

        </div>
    );

}