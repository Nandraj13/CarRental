import React, { Component,useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
export function Login(){

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
            alert("Login successfull");
        }
        else if (res.status == 404) {
            alert("Invalid email or password");
        }
    }
        return (
            <div>
           <h1>Login</h1>
    <form action="ValidateLogin" method="post">

                    <div class="form-outline mb-4 col-sm-7">
                        <input onChange={handleEmail} value={Email} type="email" class="form-control" placeholder="Email Address" required />
    </div>


                    <div class="form-outline mb-4 col-sm-7">
                        <input onChange={handlePassword} value={Password} type="password" class="form-control" placeholder="Password" required />
    </div>


                    <input onClick={handleSubmit} type="Button"class="btn btn-primary btn-block mb-2" value="Sign in" />
    </form>
              
     </div>
        )

    }