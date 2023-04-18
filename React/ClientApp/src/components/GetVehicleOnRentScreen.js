import React, {useState} from 'react';
import DatePicker from 'react-datepicker';

export function GetVehicleOnRentScreen() {
    const [selected, setSelected] = useState(Date.now());
    if (sessionStorage.getItem("usertoken") == "invalid") {
        window.location.replace("https://localhost:44475");
    }
 

    return (
        
        <div>
            <input type="date" id="birthday" name="birthday" onChange={setSelected} />
            <h1>{selected.getDay()}</h1>
            </div>
     
    );
}