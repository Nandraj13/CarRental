import React, { useEffect, useState } from 'react';
import "./YourVehicles.css";
import { AddVehicles } from "./AddVehiclesPopup";

export function YourVehicles() {
    const [isOpen, setIsOpen] = useState(false);
    const [listofvehicles, setVehicles] = useState([]);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
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
    const IdForDelete = (x) => {
        console.log(x);
    }
    const IdForView = (x) => {
        console.log(x);
    }
   


       
   
    return (
        <div>
            <h1>Your Vehicles</h1>
            <div className="align-right">
                <button type="submit" onClick={togglePopup} class="btn btn-primary col-sm-2">Add Vehicle</button>
                
            </div>
            {listofvehicles.map(vehicle => {
                return (<div class="card" style={{ width: '40rem' }}>
                    <div class="card-body" >
                        <img class="card-img-top" src={vehicle["image"]} height="500px" width="100px" alt="Card image cap" />
                        <div class="card-body">
                            
                            <h5 class="card-title">{vehicle["name"].toString()}</h5>
                            <h6 class="card-title">{vehicle["rGnumber"]}</h6>
                            <a onClick={() => IdForView(vehicle["_Id"])} class="btn btn-primary">View Vehicle</a>
                            <a onClick={() => IdForDelete(vehicle["_Id"])} class="btn btn-primary" style={{ marginLeft:'6px' }}>Delete Vehicle</a>
                        </div>
                    </div>
                </div>); })}
           
            <div className="margin">
                {isOpen && <AddVehicles handleClose={togglePopup}/>}
            </div>
         
            
        </div>
    );
}