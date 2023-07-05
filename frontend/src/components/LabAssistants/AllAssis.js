import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AddAssis from "./AddAssis";
import Sidebar from '../sidebar/Header2'

export default function AllAssis() {

    //Get Assistant data
    const [getassis, SetGetassis] = useState([]);
    console.log(getassis)

    const getassisdata = async () => {

        const res = await fetch("http://localhost:5000/getassis", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            SetGetassis(data)
        }
    }

    useEffect(() => {
        getassisdata();
    }, [])

    //Delete student data
    const deleteassis = async (id) => {

        const res2 = await fetch(`http://localhost:5000/deleteassis/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            getassisdata();

        }

    }

    return (
        <div><Sidebar/>
        <div className="container mt-5">

            <h2>Lab Assiatants</h2>

            <div className="mt-3">
                <AddAssis />

            </div>

            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Assistant Name</th>
                        <th scope="col">Qualification</th>
                        <th scope="col">Age</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {getassis.map((result, id) => {
                        return (
                            <>

                                <tr key={id}>
                                    <th scope="row">{id + 1}</th>
                                    <td>{result.assisName}</td>
                                    <td>{result.assisQuali}</td>
                                    <td>{result.assisAge}</td>
                                    <td>{result.assisEmail}</td>
                                    <td>
                                        
                                        <Link className='btn btn-warning me-3' to={`/editAssistant/${result._id}`}>Update</Link>

                                        <Button variant="btn btn-danger me-3" onClick={() => deleteassis(result._id)}>
                                            Delete
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