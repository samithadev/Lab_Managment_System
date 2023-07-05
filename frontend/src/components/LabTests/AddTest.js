import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export default function AddTest() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputval, setInputval] = useState({
        testName: "",
        testDes: "",
        testPrice: ""
    })

    const setData = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target;
        setInputval((preval) => {
            return {
                ...preval, [name]: value
            }
        })
    }

    const addTestData = async (e) => {
        e.preventDefault();
        const { testName, testDes, testPrice,testOption } = inputval;
        const res = await fetch("http://localhost:5000/addTest", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                testName, testDes, testPrice,testOption
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            alert("Error")
        } else {
            setInputval(data);
            alert("data added!")
            handleClose();
            window.location.reload();
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Test
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Tests</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Test Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter test name"
                                name='testName' onChange={setData} value={inputval.testName} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description"
                                name='testDes' onChange={setData} value={inputval.testDes} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Test Price</Form.Label>
                            <Form.Control type="Number" placeholder="Price"
                                name='testPrice' onChange={setData} value={inputval.testPrice} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.SelectCustom">
                            <Form.Label>Select Time Duration</Form.Label>
                            <Form.Select
                                custom
                                name="testOption"
                                onChange={setData}
                                value={inputval.testOption}
                            >
                                <option value="">Select an option</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </Form.Select>
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addTestData} >Add Test</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}