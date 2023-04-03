
import FileBase64 from 'react-file-base64';
import Joi from "joi-browser";
export function ViewVehicle() {
    if (sessionStorage.getItem("usertoken") == "invalid") {
        window.location.replace("https://localhost:44475");
    }
    const options = [
        'Petrol', 'Diesel', 'EV', 'CNG'
    ];
    const dataob = {
        FuelType: '',
        Name: '',
        Capacity: '',
        RGnumber: '',
        RentPerHour: '',
        Image: '',
        RcImage: '',
        UserEmailId: sessionStorage.getItem("usertoken"),
    };
    const ValidationModel = Joi.object({
        Name: Joi.string().required(),
        FuelType: Joi.string().required(),
        Capacity: Joi.number().required(),
        RGnumber: Joi.string().max(10),
        Image: Joi.string().required(),
        RentPerHour: Joi.number().required(),
        RcImage: Joi.string().required(),
        UserEmailId: Joi.string().required()
    });

    dataob.Capacity = sessionStorage.getItem("Capacity");
    dataob.FuelType = sessionStorage.getItem("Selected");
    dataob.Name = sessionStorage.getItem("Name");
    dataob.RGnumber = sessionStorage.getItem("RGnumber");
    dataob.Image = sessionStorage.getItem("Image");
    dataob.RcImage = sessionStorage.getItem("RCImage");
    dataob.RentPerHour = sessionStorage.getItem("Rentperhour");

    function onValChange(e) {
        if (e.target.name === "Name") {
            dataob.Name = e.target.value
        }
        else if (e.target.name === "Capacity") {
            dataob.Capacity = e.target.value
        }
        else if (e.target.name === "RGnumber") {
            dataob.RGnumber = e.target.value
        }
        else if (e.target.name === "Selected") {
            dataob.FuelType = e.target.value
        }
        else {
            dataob.RentPerHour = e.target.value
        }
    }
   
    const handleSubmit = async (e) => {
        const { error, value } = ValidationModel.validate(dataob);
        if (error) {
            alert(error.message);
            return;
        }

        if (dataob.Name == "" || dataob.Capacity == "" || dataob.RGnumber == "" || dataob.RentPerHour == "" || dataob.Image == "" || dataob.RcImage == "" || dataob.FuelType=="") {
            alert("All fields are mandatory");
            return;
        }
        const res = await fetch('https://localhost:7275/api/ManageVehicles/'+ sessionStorage.getItem("IdForView"), {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataob)
        });
        if (res.status == 200) {
            alert("Vehicle Updated");
            sessionStorage.setItem("Capacity",dataob.Capacity);
            sessionStorage.setItem("Selected",dataob.FuelType);
            sessionStorage.setItem("Name", dataob.Name);
            sessionStorage.setItem("RGnumber", dataob.RGnumber);
            sessionStorage.setItem("Image",dataob.Image);
            sessionStorage.setItem("RCImage",dataob.RcImage);
            sessionStorage.setItem("Rentperhour",dataob.RentPerHour);
            window.location.replace("https://localhost:44475/ViewVehicle");
        }
        else if (res.status == 400) {
            alert("Error while updating vehicle");
        }
    }
    return (

        <>
            <div id="carouselExample" class="carousel slide" style={{ height: '300px', width: '600px' }}>
                <div class="carousel-inner">
                    <div class="carousel-item active" style={{ height: '400px', width: '600px' }}>
                        <img src={sessionStorage.getItem("Image")} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item" style={{ height: '400px', width: '600px' }}>
                        <img src={sessionStorage.getItem("RCImage")} class="d-block w-100" alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div id="main-wrapper" class="container" style={{ marginTop:"50px" }}>
                                    <div class="col-lg-5">
                                        <div class="p-5">
                        <div class="form-outline mb-4 col-sm-11">
                            <input onChange={(e) => onValChange(e)} defaultValue={sessionStorage.getItem("Name")} type="text" class="form-control" placeholder="Name" name="Name" required />
                                            </div>
                                            <div class="form-outline mb-4 col-sm-11">
                            <input onChange={(e) => onValChange(e)} defaultValue={sessionStorage.getItem("Capacity")} type="text" class="form-control" placeholder="Capacity" name="Capacity" required />
                                            </div>
                                            <div class="form-outline mb-4 col-sm-11">
                            <input onChange={(e) => onValChange(e)} defaultValue={sessionStorage.getItem("RGnumber")} type="text" class="form-control" placeholder="Registration Number" name="RGnumber" required />
                                            </div>
                                            <div class="form-outline mb-4 col-sm-11">
                            <input onChange={(e) => onValChange(e)} defaultValue={sessionStorage.getItem("Rentperhour")} type="text" class="form-control" placeholder="Rent Per Hour" name="Rentperhour" required />
                                            </div>
                                            <label><b>Vehicle Image:</b> </label>
                        <FileBase64
                            multiple={false} onDone={({ base64 }) => { dataob.Image=base64 }}
                                            />
                                            <label><b>RC book Image:</b> </label>
                        <FileBase64
                            multiple={false} onDone={({ base64 }) => { dataob.RcImage = base64 }} />
                        <div class="form-outline mb-4 col-sm-11">
                            <select class="form-outline mb-4 col-sm-11" defaultValue={sessionStorage.getItem("Selected")} name="Selected" onChange={(e) => onValChange(e)}>
                                                    <option></option>
                                                    <option>{options[0]}</option>
                                                    <option>{options[1]}</option>
                                                    <option>{options[2]}</option>
                                                    <option>{options[3]}</option>
                                                </select>
                                            </div>
                                            <button type="submit" onClick={handleSubmit} class="btn btn-theme  col-sm-5">Update</button>
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
        </>
    );
}