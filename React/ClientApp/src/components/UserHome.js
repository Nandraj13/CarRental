import React, { useState } from 'react';
export function UserHome() {
    if (sessionStorage.getItem("usertoken") == "invalid") {
        window.location.replace("https://localhost:44475");
    }
    return (
        <div>
            <h1>Welcome, User</h1>
        </div>
    );
}