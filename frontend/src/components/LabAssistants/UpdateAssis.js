import React, { useState ,useEffect} from 'react'
import { NavLink ,useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Header2'

export default function UpdateAssis() {
    const navigate = useNavigate();
    
    const [inputdata,setInputdata]=useState({
        assisName:"",
        assisQuali:"",
        assisAge:"",
        assisEmail:""
    })
    
    //onchange function
    const setAssis=(e)=>{
        console.log(e.target.value);
        const {name,value}=e.target;
        setInputdata((prestud)=>{
            return{
                ...prestud,[name]:value
            }
        })
    }


    //get single data student
    const { id } = useParams("");
    console.log(id);

    const getassisdata = async () => {
        const res = await fetch(`http://localhost:5000/getassis/${id}`, {
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
        getassisdata();
    }, [])

    //update student Data
    const updateassis= async(e)=>{
        e.preventDefault();

        const {assisName, assisQuali, assisAge, assisEmail} =inputdata;
        const res2 = await fetch(`http://localhost:5000/updateassis/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                assisName, assisQuali, assisAge, assisEmail
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
            navigate('/allAssistants');
          }, 3000);


    }

    return (
        <div><Sidebar/>
        <div className='container mt-5'>
            <h4>Edit Lab Assistant Information</h4>
            <div className='underline1'></div>
            <form className='mt-5 shadow p-5 w-75'>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Assiatant Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Enter Assiatant Name" 
                    onChange={setAssis} name="assisName" value={inputdata.assisName}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Qualification</label>
                    <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Qualification"
                    onChange={setAssis} name="assisQuali" value={inputdata.assisQuali}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Age</label>
                    <input type="number" className="form-control" id="exampleFormControlInput2" placeholder="Enter Age"
                    onChange={setAssis} name="assisAge" value={inputdata.assisAge}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="Enter Email"
                    onChange={setAssis} name="assisEmail" value={inputdata.assisEmail}/>
                </div>

                <div className='d-flex'>
                         <button className='btn btn-primary' onClick={updateassis}>Update Assiatant</button>
                         <ToastContainer />
                         <NavLink className='btn btn-primary ms-auto' to="/allAssistants">Back</NavLink>
                </div>
              

            </form>
        </div>
        </div>
    )
}