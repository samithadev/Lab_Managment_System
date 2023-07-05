import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { BiRefresh } from 'react-icons/bi';

export default function AddAssis() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputval, setInputval] = useState({
        assisName:"",
        assisQuali:"",
        assisAge:"",
        assisEmail:""
    })

    const setData =(e)=>{
        console.log(e.target.value)
        const{name,value}= e.target;
        setInputval((preval)=>{
            return{
                ...preval,[name]:value
            }
        })
    }

    const addAssisData= async(e)=>{
        e.preventDefault();
        const{assisName, assisQuali, assisAge,assisEmail} = inputval;
        const res= await fetch("http://localhost:5000/addAssis",{
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                assisName, assisQuali, assisAge,assisEmail
            })
        });

        const data = await res.json();

        if(res.status ===422 || !data){
            alert("Error")
        }else{
            setInputval(data);
            alert("data added!")
            handleClose();
            window.location.reload();
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Assiatant
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Assistant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Assiatant Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter assiatant name" 
                            name='assisName' onChange={setData} value={inputval.assisName}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Qualification</Form.Label>
                            <Form.Control type="text" placeholder="Enter Qualification" 
                            name='assisQuali' onChange={setData} value={inputval.assisQuali}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Age" 
                            name='assisAge' onChange={setData} value={inputval.assisAge}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" 
                            name='assisEmail' onChange={setData} value={inputval.assisEmail} autoComplete='off'/>
                        </Form.Group>

                    </Form>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addAssisData} >Add Assistant</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}