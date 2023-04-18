
export function UserProfile() {
    if (sessionStorage.getItem("usertoken") == "invalid") {
        window.location.replace("https://localhost:44475");
    }
    const dataob = {
        UserName: '',
        Contact:'',
        Email: sessionStorage.getItem("Useremail"),
    };

    dataob.UserName = sessionStorage.getItem("UserName");
    dataob.Contact = sessionStorage.getItem("ContactNumber");

    function onValChange(e) {
        if (e.target.name === "Username") {
            dataob.UserName = e.target.value
        }
        else if (e.target.name === "Contact") {
            dataob.Contact = e.target.value
        }
    }
    return (

        <>
            <div id="main-wrapper" class="container" style={{ marginTop: "50px" }}>
                <div class="col-lg-5">
                    <div class="p-5">
                        <div class="form-outline mb-4 col-sm-11">
                            <label>Username:</label>
                            <input onChange={(e) => onValChange(e)} defaultValue={sessionStorage.getItem("UserName")} type="text" class="form-control" placeholder="Username" name="Username"/>
                        </div>
                        <div class="form-outline mb-4 col-sm-11">
                            <label>Email:</label>
                            <input onChange={(e) => onValChange(e)} defaultValue={sessionStorage.getItem("Useremail")} type="text" class="form-control" placeholder="Email" name="Email" disabled />
                        </div>
                        <div class="form-outline mb-4 col-sm-11">
                            <label>Contact number:</label>
                            <input onChange={(e) => onValChange(e)} defaultValue={sessionStorage.getItem("Contact")} type="text" class="form-control" placeholder="Contact" name="Contact"/>
                        </div>
                        <button type="submit" class="btn btn-theme  col-sm-5">Update</button>
                    </div>

                </div>
            </div>
        </>
    );
}