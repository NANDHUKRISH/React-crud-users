import React,{useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import { FetchUsers } from './FetchUsers';
function Adduser() {
    const navigate=useNavigate();
    let [state,setState]=useState({
        loading:false,
        user:{
            name:"",
            mobile:"",
            email:"",
            title:"",
            photo:"",
            groupId:""
        },
        groups:[],
        errormessage:""  
    });
  
    // function for binding
    const onInputChange=(e)=>{
       setState({
        ...state,
        user:{...state.user,
            [e.target.name]:e.target.value}
        });
    }

    // destructuring the state
    let {loading,user,groups,errormessage}=state;

    useEffect(()=>{
        const loadgroups = async ()=>{
            try{
              setState({...state,loading:true});
              let response= await FetchUsers.getAllGroup();
              setState({...state,
                loading:false,
                groups:response.data
              });
           }
           catch (error){
            setState({...state,
              loading:false,
              errormessage:error.message
            });
           }
          }
          loadgroups();
    },[]);

    //FormSubmit function

    const FormSubmit= async (e)=>{
      e.preventDefault();
      try{
        let response= await FetchUsers.CreateUser(user);
        if(response){
            navigate("/user-directory");
        }
      }catch (error){
        setState({...state,errormessage:error.message});
        navigate("/add-user");
      }
    }

  return (
    <div className="container-fluid mt-5">
    {/* <!-- Page Heading --> */}
    <div className="d-sm-flex align-items-center justify-content-evenly mb-4 " id="add-user-header">
        <h1 className="h3 mb-2 text-gray-800 " style={{fontWeight:"bold" }}>
         <i className="fa-solid fa-user-plus mr-3" ></i>Add User</h1>
       
        <button onClick={()=>navigate(-1)} className="d-none d-sm-inline-block btn btn-sm shadow-sm p-2" style={{fontWeight:"bold",backgroundColor:"#ff5555",color:"#fff",outLine:"none"}}>
            <i className=" fas fa-fw fa-caret-left "></i>Back
        </button>      
    </div>

    <div className="row d-flex align-items-center justify-content-center ">

    {/* <!-- Area Chart --> */}
    <div className="col-xl-8 col-lg-10">
        <div className="card shadow mb-4">

           {/*  <!-- Card Body --> */}
            <div className="card-body">
            <form action="#" className="formbox" onSubmit={FormSubmit}>
            <div className="user-details">
                <div className="input-box input-box-add">
                    <label htmlFor="name" className="details">NAME</label>
                    <input type="text" name="name" id="name" value={user.name} onChange={onInputChange} placeholder="Enter your name" required/>
                </div>
                <div className="input-box input-box-add" >
                    <label htmlFor="groupId" className="details">QUALIFICATION</label>
                    <select name="groupId" id="groupId" value={user.groupId} onChange={onInputChange} required>
                        <option value="">Select Your Qualification</option>
                        {
                            groups.length>0 && groups.map((data)=>{
                                return(
                                    <option key={data.id} value={data.id}>{data.name}</option>
                                )            
                            })
                        }
                    </select>
                </div>
                <div className="input-box input-box-add">
                    <label htmlFor="email" className="details" >EMAIL-ID</label>
                    <input type="email" name="email" value={user.email} onChange={onInputChange} placeholder="Enter Email-id" id="email"  required/>
                </div>
                <div className="input-box input-box-add">
                    <label htmlFor="title" className="details">DESIGNATION</label>
                    <input type="text" name="title" id="title" value={user.title} onChange={onInputChange}  placeholder="Enter your job title" required/>
                </div>
                <div className="input-box input-box-add">
                    <label htmlFor="mobile" className="details">PHONE NUMBER</label>
                    <input type="text" name="mobile" value={user.mobile} onChange={onInputChange} placeholder="Enter contact number" id="mobile" required/>
                </div>
                <div className="input-box input-box-add">
                    <label htmlFor="photo" className="details">PROFILE PICTURE</label>
                    <input type="url" name="photo" id="photo" value={user.photo} onChange={onInputChange}  placeholder="Upload Photo Url" required/>
                </div>
               
            </div>
             <div className="button">
                <button className="submitbutton" style={{fontWeight:"bold"}}>SUBMIT</button>
             </div>
        </form>
            </div>
        </div>
    </div>
    </div>

    </div>
  )
}

export default Adduser