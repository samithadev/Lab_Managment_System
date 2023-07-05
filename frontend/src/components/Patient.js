import React from "react";
import AddRequest from "./LabTestRequest/AddRequest";
import Sidebar from '../components/sidebar/Header2'

export default function Patient(){
    return(
        <div>
            <Sidebar/>
            <h1>Patient</h1>
            <AddRequest/>
        </div>
    );
}