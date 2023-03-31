import React, {useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';
export function ViewVehicle() {
    const options = [
        'Petrol', 'Diesel', 'EV', 'CNG'
    ];
    const [listofvehicles, setVehicles] = useState([]);
    const [Selected, SetSelected] = useState('');
    const [Name, SetName] = useState('');
    const [Capacity, SetCapacity] = useState('');
    const [RGnumber, SetRGnumber] = useState('');
    const [RentPerHour, SetRent] = useState('');
    const [Image, SetImage] = useState('');
    const [RcImage, SetRcImage] = useState('');

    const handleName = (e) => {
        SetName(e.target.value);
    }
    const handleCapacity = (e) => {
        SetCapacity(e.target.value);
    }
    const handleRGnumber = (e) => {
        SetRGnumber(e.target.value);
    }
    const handleRent = (e) => {
        SetRent(e.target.value);
    }
    //get vehicle by id api call
    useEffect(() => {

        const callme = () => {
            var vehicles = fetch('https://localhost:7275/api/ManageVehicles/vehicle_id/' + sessionStorage.getItem("IdForView"), {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
                .then((json) => { setVehicles(json) }).catch(r => console.log(r));
        }
        callme();
        SetSelected(listofvehicles["fuelType"]);
        SetName(listofvehicles["name"]);
        SetCapacity(listofvehicles["capacity"]);
        SetRent(listofvehicles["rentPerHour"]);
        SetRGnumber(listofvehicles["rGnumber"]);
        SetImage(listofvehicles["image"]);
        SetRcImage(listofvehicles["rcImage"]);

    }, [listofvehicles]);
   
    //update vehicle api call
        const handleSubmit = async (e) => {

            if (Name == "" || Capacity == "" || RGnumber == "" || RentPerHour == "" || Image == "" || RcImage=="") {
            alert("All fields are mandatory");
            return;
        }
        const res = await fetch('https://localhost:7275/api/ManageVehicles', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: Name,
                Capacity: Capacity,
                RGnumber: RGnumber,
                RentPerHour: RentPerHour,
                FuelType: Selected,
                Image: Image,
                RCImage: RcImage,
                Approved: listofvehicles["approved"],
                UserEmailId: sessionStorage.getItem("usertoken").toString()
            })


        });
        if (res.status == 200) {
            alert("Vehicle Update");
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
                    <div class="carousel-item active" style={{ height: '400px', width:'600px' }}>
                        <img src={Image} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item" style={{ height: '400px', width: '600px' }}>
                        <img src={RcImage} class="d-block w-100" alt="..." />
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
            <div id="main-wrapper" class="container">
                                    <div class="col-lg-5">
                                        <div class="p-5">
                                            <div class="form-outline mb-4 col-sm-11">
                                                <input onChange={handleName} value={Name} type="text" class="form-control" placeholder="Name" required />
                                            </div>
                                            <div class="form-outline mb-4 col-sm-11">
                                                <input onChange={handleCapacity} value={Capacity} type="text" class="form-control" placeholder="Capacity" required />
                                            </div>
                                            <div class="form-outline mb-4 col-sm-11">
                                                <input onChange={handleRGnumber} value={RGnumber} type="text" class="form-control" placeholder="Registration Number" required />
                                            </div>
                                            <div class="form-outline mb-4 col-sm-11">
                                                <input onChange={handleRent} value={RentPerHour} type="text" class="form-control" placeholder="Rent Per Hour" required />
                                            </div>
                                            <label><b>Vehicle Image:</b> </label>
                                            <FileBase64
                                                multiple={false} onDone={({ base64 }) => { SetImage(base64) }}
                                            />
                                            <label><b>RC book Image:</b> </label>
                                            <FileBase64
                                                multiple={false} onDone={({ base64 }) => { SetRcImage(base64) }} />
                                            <div class="form-outline mb-4 col-sm-11">
                                                <select class="form-outline mb-4 col-sm-11" value={Selected} onChange={e => SetSelected(e.target.value)}>
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