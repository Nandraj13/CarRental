import React, { useState,useEffect } from 'react';
export function UserHome() {
    if (sessionStorage.getItem("usertoken") == "invalid") {
        window.location.replace("https://localhost:44475");
    }
    const [listofvehicles, setVehicles] = useState([]);
    const [userdetails, setUserDetails] = useState([]);
    useEffect(() => {
        var vehicles = fetch('https://localhost:7275/api/ManageVehicles/ViewAvailableVehicles/' + sessionStorage.getItem("usertoken"), {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((json) => { setVehicles(json) });
        fetch('https://localhost:7275/api/ManageVehicles/ViewAvailableVehicles/')

    }, []);
    const IdForView = (x) => {
        sessionStorage.setItem("IdForView", x["_Id"]);
        sessionStorage.setItem("Name", x["name"]);
        sessionStorage.setItem("Selected", x["fuelType"]);
        sessionStorage.setItem("Rentperhour", x["rentPerHour"]);
        sessionStorage.setItem("Capacity", x["capacity"]);
        sessionStorage.setItem("RGnumber", x["rGnumber"]);
        sessionStorage.setItem("Image", x["image"]);
        sessionStorage.setItem("RCImage", x["rcImage"]);
        sessionStorage.setItem("Useremail", x["userEmailId"]);
        window.location.replace("https://localhost:44475/ViewAvailableVehicle");
    }
    return (
        <>
            <div>
                <h1>Hey, Welcome</h1>
                <h2>{listofvehicles.length == 0 ? "No vehicles available for rent" : listofvehicles.length+" vehicles available for rent"}</h2>
            </div>
                <div>

                    {listofvehicles.map(vehicle => {
                        return (<div class="card" style={{ width: '25rem' }}>
                            <div class="card-body" >
                                <img class="card-img-top" src={vehicle["image"]} height="300px" width="75px" alt="Card image cap" />
                                <div class="card-body">

                                    <h5 class="card-title">{vehicle["name"].toString()}</h5>
                                    <h6 class="card-title">{vehicle["rGnumber"]}</h6>
                                    <a onClick={() => IdForView(vehicle)} class="btn btn-primary">View Vehicle</a>
                                </div>
                            </div>
                        </div>);
                    })}
                </div>
        </>
    );
}