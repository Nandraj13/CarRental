export function ViewVehicleOwner() {
    if (sessionStorage.getItem("usertoken") == "invalid") {
        window.location.replace("https://localhost:44475");
    }
    return (

        <>
            <h2>Owner Details</h2>
            <div id="main-wrapper" class="container" style={{ marginTop: "50px" }}>
                <div class="col-lg-5">
                    <div class="p-5">
                        <div class="form-outline mb-4 col-sm-11">
                            <label>Username:</label>
                            <input defaultValue={sessionStorage.getItem("OwnerUsername")} type="text" class="form-control" placeholder="Username" name="Username" disabled/>
                        </div>
                        <div class="form-outline mb-4 col-sm-11">
                            <label>Email:</label>
                            <input  defaultValue={sessionStorage.getItem("Useremail")} type="text" class="form-control" placeholder="Email" name="Email" disabled />
                        </div>
                        <div class="form-outline mb-4 col-sm-11">
                            <label>Contact number:</label>
                            <input  defaultValue={sessionStorage.getItem("OwnerContact")} type="text" class="form-control" placeholder="Contact" name="Contact" disabled />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}