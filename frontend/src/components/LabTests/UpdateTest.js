import React, { useState ,useEffect} from 'react'
import { NavLink ,useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Header2'

export default function UpdateTest() {
    const navigate = useNavigate();
    
    const [inputdata,setInputdata]=useState({
        testName:"",
        testDes:"",
        testPrice:""
    })
    
    //onchange function
    const setTest=(e)=>{
        console.log(e.target.value);
        const {name,value}=e.target;
        setInputdata((prestud)=>{
            return{
                ...prestud,[name]:value
            }
        })
    }


    //get single data 
    const { id } = useParams("");
    console.log(id);

    const gettestdata = async () => {
        const res = await fetch(`http://localhost:5000/gettest/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setInputdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        gettestdata();
    }, [])

    //update student Data
    const updatetest= async(e)=>{
        e.preventDefault();

        const {testName, testDes, testPrice} =inputdata;
        const res2 = await fetch(`http://localhost:5000/updatetest/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                testName, testDes, testPrice
            })
        });
        const data2= await res2.json();
        setInputdata(data2);
        toast.success('Please wait  !', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true, 
            progress: undefined,
            });
        setTimeout(() => {
            navigate('/allLabTests');
          }, 3000);


    }

    return (
        <div><Sidebar/>
        <div className='container mt-5'>
            <h4>Edit Lab Test Information</h4>
            <div className='underline1'></div>
            <form className='mt-5 shadow p-5 w-75'>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Test Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Test Name" 
                    onChange={setTest} name="testName" value={inputdata.testName}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Description"
                    onChange={setTest} name="testDes" value={inputdata.testDes}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Price</label>
                    <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Price"
                    onChange={setTest} name="testPrice" value={inputdata.testPrice}/>
                </div>
                <div className='d-flex'>
                         <button className='btn btn-primary' onClick={updatetest}>Update Test</button>
                         <ToastContainer />
                         <NavLink className='btn btn-primary ms-auto' to="/allLabTests">Back</NavLink>
                </div>
              

            </form>
        </div>
        </div>
    )
}