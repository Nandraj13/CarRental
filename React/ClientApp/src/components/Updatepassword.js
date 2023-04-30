import { useState } from 'react';
export function Updatepassword() {
    const [password, setPassword] = useState('');
    const handleOnChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = async () => {
        if (password == "") {
            alert("please enter password.");
            return;
        }
        const res = await fetch('https://localhost:7275/api/User/UpdatePassword/'+sessionStorage.getItem("email_forgotpassword"), {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Password: password
                })
        });
        if (res.status == 200) {
            alert("Password Updated");
            window.location.replace("https://localhost:44475/Login");
        }
        else if (res.status == 400) {
            alert("Error while updating password");
        }
    }
    return (
        <>
            <div id="main-wrapper" class="container" style={{ marginTop: "50px" }}>
                <div class="col-lg-5">
                    <div class="p-5">

                        <div class="form-outline mb-4 col-sm-11">
                            <input onChange={handleOnChange} value={password} type="password" class="form-control" placeholder="new password" name="newpassword" />
                        </div>
                        <button onClick={handleSubmit} type="submit" class="btn btn-theme  col-sm-5">Submit</button>
                    </div>

                </div>
            </div>
        </>
    );
}