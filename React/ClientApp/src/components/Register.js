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
    
        return (

            <div height='100%' width='100%'>
                <h1>Registration</h1>

                
                    <div class="form-outline mb-4 col-sm-7">
                        <input onChange={handleUsername} type="text" class="form-control" value={Username} placeholder="Username" required="required" />
                    </div>
                    <div class="form-outline mb-4 col-sm-7">
                        <input onChange={handlePassword} type="password" class="form-control" value={Password} placeholder="Password" required min="8" />
                </div>
                <img src={image} height="500px" width="500px" style={{ float: 'right', marginTop: "-240px", marginRight: "-60px" }} />
                {/*<h4 style={{ float: 'right', marginRight: "-420px", marginTop: "170px" }}>Book Your Dream Vehicle Now</h4>*/}
                    <div class="form-outline mb-4 col-sm-7">
                        <input onChange={handleEmail} type="email" class="form-control" value={Email} placeholder="Email Address" required />
                    </div>
                    <div class="form-outline mb-4 col-sm-7">
                        <input onChange={handleContact} type="text" class="form-control" value={Contact} placeholder="Contact" required maxLength="10" minLength="10" />
                    </div>
                    <input onClick={handleSubmit} type="Button" class="btn btn-primary btn-block mb-2" value="Register" />
               
            </div>
        )
    }
