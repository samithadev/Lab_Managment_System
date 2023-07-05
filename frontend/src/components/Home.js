import React,{useState,useEffect} from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import Sidebar from './sidebar/Header2'

export default function Home() {

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


    return (
        <div>
            <Sidebar/>
            <section style={{ backgroundColor: '' }}>
            <MDBContainer className="py-5">
                <center className="p-3">
                    <h2>Admin Profile</h2>
                </center>
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                <p className="text-muted mb-1">Admin</p>
                                <p className="text-muted mb-4">Medical Laboratory Admin</p>
                            </MDBCardBody>

                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody className="p-0">
                                <MDBListGroup flush className="rounded-3">
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fas icon="globe fa-lg text-warning" />
                                        <MDBCardText>Position: Admin</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                                        <MDBCardText>Medical Laboratory</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                                        <MDBCardText>@mediLab</MDBCardText>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Position</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">System Admin</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">Admin@example.com</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Mobile</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="4">
                                {/* <MDBCard className="card bg-danger mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <center>
                                            <h2>No of Requests</h2>
                                        </center>
                                    </MDBCardBody>
                                </MDBCard> */}

                                <MDBCard className="card bg-primary mb-4 mb-md-0 mt-3">
                                    <MDBCardBody>
                                        <center>
                                            <h2>No of Assistants</h2>
                                            <h2>{getassis.length}</h2>
                                        </center>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                            <MDBCol md="4">
                                <MDBCard className="card bg-warning mb-4 mb-md-0 mt-3">
                                    <MDBCardBody >
                                        <center>
                                            <h2>Total Requests</h2>
                                            <h2>{getrequest.length}</h2>
                                        </center>
                                    </MDBCardBody>
                                </MDBCard>

                            </MDBCol>

                            <MDBCol md="4">
                            <MDBCard className="card bg-danger mb-4 mb-md-0 mt-3">
                                    <MDBCardBody >
                                        <center>
                                            <h2>Total Tests</h2>
                                            <h2>{gettest.length}</h2>
                                        </center>
                                    </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>

        </div>
        
    );
}