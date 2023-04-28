import React, { useEffect, useState } from 'react';
import "./YourVehicles.css";
import { AddVehicles } from "./AddVehiclesPopup";

export function YourVehicles() {
    if (sessionStorage.getItem("usertoken") == "invalid") {
        window.location.replace("https://localhost:44475");
    }
    const options = [
        'name', 'capacity', 'fuelType'
    ];

    const [Selected, SetSelected] = useState('name');
    const [isOpen, setIsOpen] = useState(false);
    const [listofvehicles, setVehicles] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    //get user vehicle api call
    useEffect(() => {
        var vehicles = fetch('https://localhost:7275/api/ManageVehicles/' + sessionStorage.getItem("usertoken"), {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((json) => { setVehicles(json) });
        
    }, []);
    //vehicle delete api call
    const IdForDelete = async (x) => {
        var result = await fetch('https://localhost:7275/api/ManageVehicles/' + x, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (result.status == 200) {
            alert("Vehicle Delete Successfully");
            window.location.replace("https://localhost:44475/YourVehicles");
        }
        else {
            alert("Error while deleting vehicle");
        }

    }
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
        window.location.replace("https://localhost:44475/ViewVehicle");
    }
   


       
   
    return (
        <div>
            <h1>Your Vehicles</h1>
            <h2><h2>{listofvehicles.length == 0 ? "You have not added any vehicles yet." : "You have added "+listofvehicles.length+" vehicles"}</h2></h2>
           
            <div className="align-right">
                <button type="submit" onClick={togglePopup} class="btn btn-primary col-sm-2">Add Vehicle</button>
                
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
                            <h6 class="card-title">Approved: {vehicle["approved"]?"Yes":"No"}</h6>
                            <a onClick={() => IdForView(vehicle)} class="btn btn-primary">View Vehicle</a>
                            <a onClick={() => IdForDelete(vehicle["_Id"])} class="btn btn-primary" style={{ marginLeft:'6px' }}>Delete Vehicle</a>
                        </div>
                    </div>
                </div>); })}
           
            <div className="margin">
                {isOpen && <AddVehicles handleClose={togglePopup}/>}
            </div>

            </div>
        </div>
    );
}