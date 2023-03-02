import { getJSON } from 'jquery';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import image from './Images/205.jpg';
export function Registration() {


    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [Contact, setContact] = useState('');
    const handleUsername = (e) => {
        setUsername(e.target.value);
        console.log(Username);
    };


    const handlePassword = (e) => {
        setPassword(e.target.value);
        console.log(Password);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
        console.log(Email);
    };
    const handleContact = (e) => {
        setContact(e.target.value);
        console.log(Contact);
    };
    const handleSubmit = async (e) => {
        if (Email == "" || Password == "" || Contact == "" || Username == "") {
            alert("All fields are mandatory");
            return;
        }
        const res = await fetch("https://localhost:7275/api/Register", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: Email,
                Password: Password,
                Username: Username,
                Contact: Contact
            })


        });
        if (res.status == 200) {
            alert("Registration successfull");
            window.location.replace("https://localhost:44475/Login");
        }
        else if (res.status==400) {
            alert("Email Already Registered");
        }
    }
    const goToLogin = () => {
        window.location.replace("https://localhost:44475/Login");
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
                                            <h3 class="h4 font-weight-bold text-theme">Register</h3>
                                        </div>

                                        <h6 class="h5 mb-0">Hey,Welcome</h6>
                                        <p class="mt-2 mb-5">Register yourself to book your dream car</p>


                                        <div class="form-outline mb-4 col-sm-11">
                                            <input onChange={handleUsername} type="text" class="form-control" value={Username} placeholder="Username" required="required" />
                                        </div>
                                        <div class="form-outline mb-4 col-sm-11">
                                            <input onChange={handlePassword} type="password" class="form-control" value={Password} placeholder="Password" required min="8" />
                                        </div>
                             
                                        <div class="form-outline mb-4 col-sm-11">
                                            <input onChange={handleEmail} type="email" class="form-control" value={Email} placeholder="Email Address" required />
                                        </div>
                                        <div class="form-outline mb-4 col-sm-11">
                                            <input onChange={handleContact} type="text" class="form-control" value={Contact} placeholder="Contact" required maxLength="10" minLength="10" />
                                        </div>
                                        <input onClick={handleSubmit} type="Button" class="btn btn-primary btn-block mb-2" value="Register" />


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


                    <p class="text-muted text-center mt-3 mb-0">Already have an account? <a onClick={goToLogin} class="text-primary ml-1">Login</a></p>


                </div>

            </div>

        </div>
    );
    }
