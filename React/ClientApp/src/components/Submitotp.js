import { useState } from 'react';
export function Submitotp() {
    const [otp, setOtp] = useState('');
    const handleOnChange = (e) => {
        setOtp(e.target.value);
    }
    const checkOtp = async (e) => {
        if (sessionStorage.getItem("otp") == otp) {
            window.location.replace("https://localhost:44475/Updatepassword");
        }
        else {
            alert("otp invalid");
            return;
        }
    };
    return (
        <>
            <div id="main-wrapper" class="container" style={{ marginTop: "50px" }}>
                <div class="col-lg-5">
                    <div class="p-5">

                        <div class="form-outline mb-4 col-sm-11">
                            <input onChange={handleOnChange} value={otp} type="text" class="form-control" placeholder="otp" name="otp" />
                        </div>
                        <button onClick={checkOtp} type="submit" class="btn btn-theme  col-sm-5">Submit</button>
                    </div>

                </div>
            </div>
        </>
    );
}