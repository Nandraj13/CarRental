﻿import React, { useState,useEffect } from 'react';
export function AdminHome() {
    if (sessionStorage.getItem("usertoken") == "invalid") {
        window.location.replace("https://localhost:44475");
    }
    const options = [
        'name', 'capacity', 'fuelType'
    ];

    const [Selected, SetSelected] = useState('name');
    const [listofvehicles, setVehicles] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        var vehicles = fetch('https://localhost:7275/api/ManageVehiclesV2/vehicles/notapproved', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((json) => { setVehicles(json) });

    }, []);
    const IdForView = (x) => {
        sessionStorage.setItem("IdForView", x["_Id"]);
        sessionStorage.setItem("Name", x["name"]);
        sessionStorage.setItem("Selected", x["fuelType"]);
        sessionStorage.setItem("Rentperhour", x["rentPerHour"]);
        sessionStorage.setItem("Capacity", x["capacity"]);
        sessionStorage.setItem("City", x["city"]);
        sessionStorage.setItem("RGnumber", x["rGnumber"]);
        sessionStorage.setItem("Image", x["image"]);
        sessionStorage.setItem("RCImage", x["rcImage"]);
        sessionStorage.setItem("Useremail", x["userEmailId"]);
        window.location.replace("https://localhost:44475/AdminViewVehicle");
    }
    return (
        <>
        <div>
                <h1>Welcome, Admin</h1>
                <h2>{listofvehicles.length == 0 ? "No vehicles to be approved." : listofvehicles.length + " vehicles are pending for approval."}</h2>
            </div>
            <h6>Search:</h6>
            <div class="form-outline  col-sm-1">
                <select class="form-outline col-sm-11" value={Selected} onChange={e => SetSelected(e.target.value)} >
                    <option>{options[0]}</option>
                    <option>{options[1]}</option>
                    <option>{options[2]}</option>
                </select>
            </div>
            <div>
                <input
                    type="text"
                    name="search"
                    value={searchValue}
                    placeholder="Enter search value"
                    onChange={e => setSearchValue(e.target.value)}
                />
            </div>
                <div>

                {listofvehicles.filter(vehicle => vehicle[Selected].match(new RegExp(searchValue, "i"))).map(vehicle => {
                    return (<div class="card" style={{ width: '25rem' }}>
                        <div class="card-body" >
                            <img class="card-img-top" src={vehicle["image"]} height="300px" width="75px" alt="Card image cap" />
                            <div class="card-body">

                                <h5 class="card-title">Vehicle Name: {vehicle["name"].toString()}</h5>
                                <h6 class="card-title">Registration No: {vehicle["rGnumber"]}</h6>
                                <a onClick={() => IdForView(vehicle)} class="btn btn-primary">View Vehicle</a>
                            </div>
                        </div>
                    </div>);
                })}
            </div>
        </>
        );
}