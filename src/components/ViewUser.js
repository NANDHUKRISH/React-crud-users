import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from "react-router-dom";
import { FetchUsers } from './FetchUsers';
import Spinner from './Spinner';
function ViewUser() {
    const navigate=useNavigate();
    let {userId}=useParams();
    const [state,setState]=useState({
      loading:false,
      user:{},
      errormessage:"",
      group:{}
    });

    useEffect(()=>{
      const loadusers = async ()=>{
        try{
          setState({...state,loading:true});
          let response = await FetchUsers.getUser(userId);
          let response1 = await FetchUsers.getGroup(response.data);
          setState({...state,
            loading:false,
            user:response.data,
            group:response1.data
          });
       }
       catch (error){
        setState({...state,
          loading:false,
          errormessage:error.message
        });
       }
      }
       loadusers();
    },[userId]);

    let {loading,user,errormessage,group} =state;

  return (
   
    <section className="users-list d-flex align-items-center justify-content-around mt-5">
       {loading? <Spinner/> :
        Object.keys(user).length>0 &&
        <div className="container-list ">
        <div className="row d-flex align-items-center justify-content-center" >
        <div className="col-lg-12 mt-4" id="inner-row-view">
           <div className="user d-flex align-items-center justify-content-around">
            <div className="user-pic-view">
              <img src={user.photo} className="img-fluid" alt="user-pic" />
            </div>
            <div className="user-info-single">
            <span>Name : <b>{user.name}</b></span>
                   <span>Qualification : <b>{group.name}</b></span>
                   <span>Email : <b>{user.email}</b></span>
                   <span>Title : <b>{user.title}</b></span>
                   <span>Mobile : <b>{user.mobile}</b></span>
            </div>
           </div>
          </div> 
        </div>
        <div id="Back-button-view">
            <button onClick={()=>navigate(-1)}  style={{fontWeight:"bold"}}>
            <i className=" fas fa-fw fa-caret-left "></i>Back
        </button> 
        </div>
       </div>
       }
    </section>
  )
}

export default ViewUser