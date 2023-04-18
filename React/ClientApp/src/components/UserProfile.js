
export function UserProfile() {
    if (sessionStorage.getItem("usertoken") == "invalid") {
        window.location.replace("https://localhost:44475");
    }
    const dataob = {
        UserName: '',
        Contact: '',
        Password: '',
        _id: sessionStorage.getItem("LoggedUserid"),
        Email: sessionStorage.getItem("usertoken"),
    };

    dataob.UserName = sessionStorage.getItem("LoggedUsername");
    dataob.Contact = sessionStorage.getItem("LoggedUserContact");
    dataob.Password = sessionStorage.getItem("LoggedUserPassword");
    function onValChange(e) {
        if (e.target.name === "Username") {
            dataob.UserName = e.target.value
        }
        else if (e.target.name === "Contact") {
            dataob.Contact = e.target.value
        }
    }
    const handleSubmit =async () => {
        const res = await fetch('https://localhost:7275/api/User/UpdateUser/' + sessionStorage.getItem("usertoken"), {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataob)
        });
        if (res.status == 200) {
            alert("Profile Updated");
            sessionStorage.setItem("LoggedUsername", dataob.UserName);
            sessionStorage.setItem("LoggedUserContact", dataob.Contact);
            window.location.replace("https://localhost:44475/UserProfile");
        }
        else if (res.status == 400) {
            alert("Error while updating profile");
        }
    }
    return (

        <>
            <div id="main-wrapper" class="container" style={{ marginTop: "50px" }}>
                <div class="col-lg-5">
                    <div class="p-5">
                        <div class="form-outline mb-4 col-sm-11">
                            <label>Username:</label>
                            <input onChange={(e) => onValChange(e)} defaultValue={sessionStorage.getItem("LoggedUsername")} type="text" class="form-control" placeholder="Username" name="Username"/>
                        </div>
                        <div class="form-outline mb-4 col-sm-11">
                            <label>Email:</label>
                            <input onChange={(e) => onValChange(e)} defaultValue={sessionStorage.getItem("usertoken")} type="text" class="form-control" placeholder="Email" name="Email" disabled />
                        </div>
                        <div class="form-outline mb-4 col-sm-11">
                            <label>Contact number:</label>
                            <input onChange={(e) => onValChange(e)} defaultValue={sessionStorage.getItem("LoggedUserContact")} type="text" class="form-control" placeholder="Contact" name="Contact"/>
                        </div>
                        <button onClick={handleSubmit}type="submit" class="btn btn-theme  col-sm-5">Update</button>
                    </div>

                </div>
            </div>
        </>
    );
}