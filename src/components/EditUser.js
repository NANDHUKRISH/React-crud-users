import React, {useState,useEffect} from 'react'
import {useNavigate,useParams} from "react-router-dom";
import { FetchUsers } from './FetchUsers';
function EditUser() {
    let {userId}=useParams();
    let [state,setState]=useState({
       loading: false,
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
    })
    const navigate=useNavigate();

    useEffect(()=>{
        const loadgroups = async ()=>{
            try{
              setState({...state,loading:true});
              let response= await FetchUsers.getUser(userId);
              let response1= await FetchUsers.getAllGroup();
              setState({...state,
                loading:false,
                user:response.data,
                groups:response1.data
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

    let {loading,user,groups,errormessage}=state;

    //FUnction to update

    const onInputChange=(e)=>{
       setState({...state,
        user:{...state.user,[e.target.name]:e.target.value}})
    }

    //submitForm function

    const submitForm= async (e)=>{
        e.preventDefault();
        try{
            let response = await FetchUsers.UpdateUser(user,userId);
            if(response){
                navigate("/user-directory")
            }
        }catch (error){
           setState({...state,errormessage:error.message});
           navigate(`/edit-user/${userId}`)
        }
       
    }

  return (
    <div className="container-fluid mt-5">
    {/* <!-- Page Heading --> */}
    <div className="d-sm-flex align-items-center justify-content-evenly mb-4 text-primary" id="add-user-header">
        <h1 className="h3 mb-2 text-gray-800 " style={{fontWeight:"bold" }}>
        <i className="fa-solid fa-pen-to-square mr-3"></i>Edit User</h1>
       
        <button onClick={()=>navigate(-1)} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm p-2" style={{fontWeight:"bold"}}>
            <i className=" fas fa-fw fa-caret-left "></i>Back
        </button>    
    </div>

    <div className="row d-flex align-items-center justify-content-center ">

    {/* <!-- Area Chart --> */}
    <div className="col-xl-8 col-lg-10">
        <div className="card shadow mb-4">

           {/*  <!-- Card Body --> */}
            <div className="card-body">
            <form action="#" className="formbox" onSubmit={submitForm}>
            <div className="user-details" id="user-details-edit">
                <div className="input-box input-box">
                    <label htmlFor="name" className="details">NAME</label>
                    <input type="text" name="name" id="name" value={user.name} onChange={onInputChange} placeholder="Enter your name" required/>
                </div>
                <div className="input-box input-box" >
                    <label htmlFor="groupId" className="details">QUALIFICATION</label>
                    <select name="groupId" id="groupId" value={user.groupId} onChange={onInputChange}>
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
                <div className="input-box input-box">
                    <label htmlFor="email" className="details" >EMAIL-ID</label>
                    <input type="email" name="email" value={user.email} onChange={onInputChange} placeholder="Enter Email-id" id="email"  required/>
                </div>
                <div className="input-box input-box">
                    <label htmlFor="title" className="details">DESIGNATION</label>
                    <input type="text" name="title" id="title" value={user.title} onChange={onInputChange}  placeholder="Enter your job title" required/>
                </div>
                <div className="input-box input-box">
                    <label htmlFor="mobile" className="details">PHONE NUMBER</label>
                    <input type="text" name="mobile" value={user.mobile} onChange={onInputChange} placeholder="Enter contact number" id="mobile" required/>
                </div>
                <div className="input-box input-box">
                    <label htmlFor="photo" className="details">PROFILE PICTURE</label>
                    <input type="url" name="photo" id="photo" value={user.photo} onChange={onInputChange}  placeholder="Upload your profile pic" required/>
                </div>
               
            </div>
             <div className="button">
                <button className="submitbutton" id="submitbutton-edit" style={{fontWeight:"bold"}}>SUBMIT</button>
             </div>
        </form>
            </div>
        </div>
    </div>
    </div>

    </div>
  )
}

export default EditUser