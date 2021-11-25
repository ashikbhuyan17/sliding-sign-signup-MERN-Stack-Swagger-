import React from 'react'
import jwt_decode from "jwt-decode";

function Dashboard() {
    // console.log(JSON.parse(localStorage.getItem("userInfo")));
    let data = JSON.parse(localStorage.getItem("userInfo"))
    console.log(data.token.token);
    let token = jwt_decode(data.token.token)
    console.log(token, token.email);

    // console.log((JSON.parse(localStorage.getItem("userInfo").token)))
    return (
        <div>
            <h4>this is a user dashboard</h4>
        </div>
    )
}

export default Dashboard;
