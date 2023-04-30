import { useState } from 'react';
import { send } from 'emailjs-com';
export function Forgotpassword() {
    const [email, setEmail] = useState('');
    var message = {
        from_name: "Anonymous",
        to_name: email,
        message: "your otp to reset password is",
        reply_to:''
        }
    const handleOnChange = (e) => {
        setEmail(e.target.value);
    }
    const sendMail = async (e) => {

        const res = await fetch('https://localhost:7275/api/User/Checkuser/' + email, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
        }
          
        );
        if (res.status == 200) {
            sessionStorage.setItem("email_forgotpassword", email);
            const random = Math.floor(Math.random() * 90000 + 10000);
            message.message = message.message + " " + random;
            sessionStorage.setItem("otp", random);
            e.preventDefault();
            send(
                'service_x1ebnvm',
                'template_o44tzc3',
                message,
                'Fg5xLVVR9CRt1M30o'
            )
                .then((response) => {
                    
                    alert("otp sent to registered email.");
                    window.location.replace("https://localhost:44475/Submitotp");

                })
                .catch((err) => {
                 
                    alert("system error occured.");
                });
        }
        else if (res.status == 400) {
            alert("no such user exist");
            return;
        }
           
        
        
    };
    return (
        <>
            <div id="main-wrapper" class="container" style={{ marginTop: "50px" }}>
                <div class="col-lg-5">
                    <div class="p-5">
                 
                        <div class="form-outline mb-4 col-sm-11">
                            <input onChange={handleOnChange} value={email} type="text" class="form-control" placeholder="Email" name="Email"/>
                        </div>
                        <button onClick={sendMail } type="submit" class="btn btn-theme  col-sm-5">Get otp</button>
                    </div>

                </div>
            </div>
        </>
        );
}