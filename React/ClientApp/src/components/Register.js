import { getJSON } from 'jquery';
import React, { useState } from 'react';
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
        }
        else if (res.status==400) {
            alert("Email Already Registered");
        }
    }
    
        return (

            <div>
                <h1>Registration</h1>
               

                    <div class="form-outline mb-4 col-sm-7">
                        <input onChange={handleUsername} type="text" class="form-control" value={Username} placeholder="Username" required="required" />
                    </div>
                    <div class="form-outline mb-4 col-sm-7">
                        <input onChange={handlePassword} type="password" class="form-control" value={Password} placeholder="Password" required min="8" />
                    </div>
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
