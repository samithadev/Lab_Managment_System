import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Sidebar from '../sidebar/Header2'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AllRequests() {

    //Get Request data
    const [getrequest, SetGetrequest] = useState([]);
    console.log(getrequest)

    const getrequestdata = async () => {

        const res = await fetch("http://localhost:5000/getrequest", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            SetGetrequest(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getrequestdata();
    }, [])

    //Delete student data
    const deleterequest = async (id) => {

        const res2 = await fetch(`http://localhost:5000/deleterequest/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            getrequestdata();

        }

    }

    //send email
    const handleReminderClick = async (id) => {
        try {
          const res3 = await fetch(`http://localhost:5000/sendReminder/${id}`, {
            method: "POST",
          });
          const data = await res3.json();
          console.log(data.message);
          toast.success("Reminder email sent");
        
        } catch (err) {
          console.error(err);
          alert("Failed to send reminder email");
        }
      };

    return (
        <div><Sidebar/>
        <div className="container mt-5">

            <h2>Lab Test Requests</h2>

            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Patient Email</th>
                        <th scope="col">Test:Need Report</th>
                    </tr>
                </thead>
                <tbody>

                    {getrequest.map((result, id) => {
                        return (
                            <>

                                <tr key={id}>
                                    <th scope="row">{id + 1}</th>
                                    <td>{result.patientName}</td>
                                    <td>{result.patientCont}</td>
                                    <td>{result.patientEmail}</td>
                                    <td>{result.patientTest}</td>
                                    <td>

                                        <Button variant="btn btn-danger me-3" onClick={() => deleterequest(result._id)}>
                                            Delete
                                        </Button>
                                        <div className="mt-3">
                                            <Link className='btn btn-warning me-3' to={`/createReport/${result._id}`}>Create Report</Link>

                                        </div>
                                        <Button variant="btn btn-primary me-3 mt-3 " onClick={() => handleReminderClick(result._id)}>
                                        <ToastContainer />
                                            Send Remainder
                                        </Button>
                                        
                                    </td>
                                </tr>


                            </>
                        )
                    })}

                </tbody>
            </Table>
        </div>
        </div>
    );
}