import React, { useState } from 'react';
import FileBase64 from 'react-file-base64';
import 'react-dropdown/style.css';
export function AddVehicles() {
    const options = [
        'Petrol','Diesel','EV','CNG'
    ];
   
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
  
    const handleSubmit = async (e) => {
        console.log(Image);
        if (Name == "" || Capacity == "" || RGnumber == "" || RentPerHour == "" || Image=="") {
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
                Approved: true,
                UserEmailId: sessionStorage.getItem("usertoken").toString()
            })


        });
        if (res.status == 200) {
            alert("Vehicle Added");
        }
        else if (res.status == 400) {
            alert("Error while adding vehicle");
        }
    }
    return (
        <>
            
            <div id="main-wrapper" class="container">
               
                <div class="row justify-content-center">
                    <div class="col-xl-10">
                        <div class="card border-0">
                            <div class="card-body p-0">
                                <div class="row no-gutters">
                                    <div class="col-lg-6">
                                        <div class="p-5">
                                            <div class="mb-5">
                                                <h3 class="h4 font-weight-bold text-theme">Add Vehicle</h3>
                                            </div>

                                            
                                            <h6 class="mt-2 mb-5 font-weight-bold">Enter vehicle details</h6>


                                            <div class="form-outline mb-4 col-sm-11">
                                                <input onChange={handleName} value={Name} type="text" class="form-control" placeholder="Name" required />
                                            </div>
                                            <div class="form-outline mb-4 col-sm-11">
                                                <input onChange={handleCapacity} value={Capacity} type="text" class="form-control" placeholder="Capacity" required />
                                            </div>
                                            <div class="form-outline mb-4 col-sm-11">
                                                <input onChange={handleRGnumber } value={RGnumber} type="text" class="form-control" placeholder="Registration Number" required />
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
                                                multiple={false} onDone={({ base64 }) => { SetRcImage(base64) }}/>
                                            <div class="form-outline mb-4 col-sm-11">
                                                <select class="form-outline mb-4 col-sm-11" value={Selected} onChange={e => SetSelected(e.target.value)}>
                                                    <option></option>
                                                    <option>{options[0]}</option>
                                                    <option>{options[1]}</option>
                                                    <option>{options[2]}</option>
                                                    <option>{options[3]}</option>
                                                </select>
                                            </div>
                                            <button type="submit" onClick={handleSubmit} class="btn btn-theme  col-sm-5">Add</button>
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

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
        );
}