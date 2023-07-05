import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AddTest from "./AddTest";
import UpdateTest from "./UpdateTest";
import Sidebar from '../sidebar/Header2'

export default function AllLabTests() {

    //Get tests data
    const [gettest, SetGettest] = useState([]);
    console.log(gettest)

    const gettestdata = async () => {

        const res = await fetch("http://localhost:5000/gettest", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            SetGettest(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        gettestdata();
    }, [])

    //Delete student data
    const deletetest = async (id) => {

        const res2 = await fetch(`http://localhost:5000/deletetest/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            gettestdata();

        }

    }

    //search Lab Test
    const [searchInput,setSearchInput]=useState('');
    const searchTest=(searchval)=>{
        setSearchInput(searchval)
    }

    return (
        <div><Sidebar/>
        <div className="container mt-5">

            <h2>Available Lab Tests</h2>

            <div className="mt-5 ">
                <AddTest />
                <div class="ms-auto w-50">
                    <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="Search Test" 
                        onChange={(e)=>searchTest(e.target.value)}
                    />
                </div>

            </div>

            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Test Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Time Duration</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {gettest.filter((val)=>{
                        if(searchInput == ""){
                            return val
                        }else if(val.testName.toLowerCase().includes(searchInput.toLowerCase())){
                            return val; 
                        }
                    }).map((result, id) => {
                        return (
                            <>

                                <tr key={id}>
                                    <th scope="row">{id + 1}</th>
                                    <td>{result.testName}</td>
                                    <td>{result.testDes}</td>
                                    <td>{result.testPrice}</td>
                                    <td>{result.testOption}</td>
                                    <td>
                                        <Link className='btn btn-warning me-3' to={`/edit/${result._id}`}>Update</Link>

                                        <Button variant="btn btn-danger me-3" onClick={() => deletetest(result._id)}>
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