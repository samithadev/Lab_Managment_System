import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export default function AddRequest() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputval, setInputval] = useState({
        patientName: "",
        patientCont: "",
        patientEmail: "",
        patientTest: ""
    })

    const [selected, setSelected] = useState([] || null);

    const setData = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target;
        setInputval((preval) => {
            return {
                ...preval, [name]: value
            }
        })

        // Find the selected test object from the gettest array
        const test = gettest.find((t) => t.testName === value);
        if (test) {
            setSelected(test);
        }
    }

    const addRequestData = async (e) => {
        e.preventDefault();
        const { patientName, patientCont, patientEmail, patientTest } = inputval;
        const phoneRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for validating email
        
        // Validate phone number
        if (patientCont && !phoneRegex.test(patientCont)) {
            alert("Please enter a valid 10-digit phone number.");
            return; // Stop form submission if phone number is invalid
        }
        
        // Validate email
        if (patientEmail && !emailRegex.test(patientEmail)) {
            alert("Please enter a valid email address.");
            return; // Stop form submission if email is invalid
        }
        
        const res = await fetch("http://localhost:5000/addRequest", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                patientName, patientCont, patientEmail, patientTest, testPrice: selected.testPrice
            })
        });
        
        const data = await res.json();
        console.log(data);
        
        if (res.status === 422 || !data) {
            alert("Error");
        } else {
            setInputval(data);
            alert("Send Request!");
            handleClose();
        }
    };



    //Get tests data
    const [gettest, SetGettest] = useState([]);
    console.log(gettest)

    // const [selected, setSelected] = useState([] || null);

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

    return (
        <>
            <Button variant="primary" onClick={handleShow} >
                Send Report Request
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Send Report Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Your Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name"
                                name='patientName' onChange={setData} value={inputval.patientName} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contact No:</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Contact Number"
                                name='patientCont' onChange={setData} value={inputval.patientCont} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Email: Report will send to this email</Form.Label>
                            <Form.Control type="email" placeholder="Enter valid Email"
                                name='patientEmail' onChange={setData} value={inputval.patientEmail} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Select Test</Form.Label>
                            <Form.Select
                                name='patientTest' onChange={setData} value={inputval.patientTest}

                            >
                                <option value="">Please choose</option>
                                {gettest.map((result) => {
                                    return (
                                        <option key={result._id} value={result.testName} >{result.testName}</option>
                                    )
                                })}
                            </Form.Select >
                            <br></br>
                            <center>
                                <h3>{selected && <span>Price: Rs.{selected.testPrice}</span>}</h3>
                            </center>
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addRequestData} >Send Request</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}