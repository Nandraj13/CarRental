import React, { useState } from 'react';
import $ from 'jquery';
export function GetVehicleOnRentScreen() {
   
    const [rent, SetRent] = useState('');

    if (sessionStorage.getItem("usertoken") == "invalid") {
        window.location.replace("https://localhost:44475");
    }
    const handleRent = (e) => {
        SetRent(e.target.value);
    }
    function calculateRent() {
        if (sessionStorage.getItem("sd") == "" || sessionStorage.getItem("ed") == "") {
            return;
        }
        else {
            var date1 = new Date(sessionStorage.getItem("sd"));
            var date2 = new Date(sessionStorage.getItem("ed"));
            var time_difference = date2.getTime() - date1.getTime();

            //calculate days difference by dividing total milliseconds in a day  
            var days_difference = (time_difference / (1000 * 60 * 60 * 24)) + 1;
            var rent = days_difference * 24 * parseInt(sessionStorage.getItem("Rentperhour"));
            console.log(days_difference, rent);
            SetRent(rent);
        }
    }
    function handleStartDate(e) {
        const dateValue = e.target.value;
        console.log("dateValue",  dateValue);
        sessionStorage.setItem("sd", dateValue);
        if (sessionStorage.getItem("ed") != "") {
            calculateRent();
        }
    }
    function handleEndDate(e) {
        var dateValue = e.target.value;
        console.log("dateValue", dateValue);
        sessionStorage.setItem("ed", dateValue);
        if (sessionStorage.getItem("sd") != "") {
            calculateRent(); 
        }
       
    }
    const handleSubmit = async () => {
        const res = await fetch('https://localhost:7275/api/Bookings', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                VehicleId: sessionStorage.getItem("IdForView"),
                PickupDate: sessionStorage.getItem("sd"),
                ReturnDate: sessionStorage.getItem("ed"),
                CustomerEmail: sessionStorage.getItem("usertoken"),
                OwnerEmail: sessionStorage.getItem("Useremail"),
                TotalRent:rent,
            })
        });
        if (res.status == 200) {
            alert("Vehicle booked");
            sessionStorage.setItem("ed", "");
            sessionStorage.setItem("sd", "");
            window.location.replace("https://localhost:44475/UserHome");
        }
        else if (res.status == 400) {
            alert("Vehicle already booked for selected dates, please try another dates");
        }
        else if (res.status == 401) {
            alert("Vehicle not fount");
        }
    }
    return (

        <>
            <h1>You are one step away, fill below details to get this vehicle on rent</h1>
            <div id="main-wrapper" class="container" style={{ marginTop: "50px" }}>
                <div class="col-lg-5">
                    <div class="p-5">
                        <div class="form-outline mb-4 col-sm-11">
                            <label>Start date:</label>
                            <input type="date" name="startdate" onChange={(e) => handleStartDate(e)} min={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div class="form-outline mb-4 col-sm-11">
                            <label>End date:</label>
                            <input type="date" name="enddate" onChange={(e) => handleEndDate(e)} min={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div class="form-outline mb-4 col-sm-11">
                            <label>Total rent:</label>
                            <input id="dater" onChange={handleRent} defaultValue={rent} type="text" class="form-control" placeholder="Rent per hour" name="Rent" disabled />
                        </div>
                        <button onClick={handleSubmit} type="submit" class="btn btn-theme  col-sm-9">Confirm booking</button>
                    </div>

                </div>
            </div>
        </>
    );
}