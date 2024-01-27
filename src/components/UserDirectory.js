import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import { FetchUsers } from './FetchUsers';
import Spinner from './Spinner';
function UserDirectory() {
  let navigate=useNavigate();
  let [query,setQuery]=useState("");
  let [state,setState]=useState({
    loading:false,
    users:[],
    FilteredUsers:[],
    errormessage:"",
    groups:[]
  });

  useEffect(()=>{

    const loadusers = async ()=>{
      try{
        setState({...state,loading:true});
        let response = await FetchUsers.getAllUsers();
        let response1= await FetchUsers.getAllGroup();
        setState({...state,
          loading:false,
          users:response.data,
          FilteredUsers:response.data,
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
     loadusers();
  },[])

  const DeleteUser= async (userId) =>{
     let response = await FetchUsers.DeleteUser(userId);
     if(response){
      try{
        setState({...state,loading:true});
        let response = await FetchUsers.getAllUsers();
        let response1= await FetchUsers.getAllGroup();
        setState({...state,
          loading:false,
          users:response.data,
          FilteredUsers:response.data,
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
  }

  // Search User Function

  const FilterUser = (e)=>{
     setQuery(e.target.value);
     let theuser=users.filter((user)=>{
          return user.name.toLowerCase().includes(e.target.value.toLowerCase());
     });
     setState({...state,FilteredUsers:theuser});
  }

  let {loading,users,errormessage,FilteredUsers,groups} =state; 

  return (
    <>
    <section className="user-search p-3 mb-0">
      <pre>{query.text}</pre>
      <div className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3" style={{color:"black",fontWeight:"900",fontSize:"30px"}}>  <i className="fa-solid fa-users mr-3" style={{color:"rgb(255, 102, 71)"}}></i>Users <span style={{color:"rgb(255, 102, 71)"}}>Page</span> </p>
              <p className="fst-italic">This page will show the whole details of users . You can search for particular user in the search box . Three buttons will allow You to do CRUD Operations on users </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
               <form className="row">
                <div className="col">
                <div className="mb-2">
                  <input type="text"
                  name="text"
                   value={query}
                   onChange={FilterUser}
                   className="form-control" placeholder="Search Users.."/>
                </div>
                </div>
                <div className='col'>
               {/*  <div className="mb-2">
                  <input type="submit" className="btn btn-outline-dark" value="Search" style={{fontWeight:"600"}}/>
                </div> */}
                </div>
               </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    { loading ?< Spinner/> :
     <section className="users-list mt-0">
     <div className="container">
      <div className="row">
         { FilteredUsers.length===0 && <div className="col-lg-12 mt-4" style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"25px",fontWeight:"900",color:"tomato",marginTop:"20px"}}>No Match Found</div>}
       { FilteredUsers.length>0 && 
        FilteredUsers.map((data)=>{
             return (
        <div className="col-lg-6 mt-4" key={data.id}>
         <div className="user d-flex align-items-start">
          <div className="user-pic">
            <img src={data.photo} className="img-fluid" alt="user-pic" />
          </div>
          <div className="user-info">
               <h4>{data.name}</h4>
               <span>{data.title}</span>
               <b>{groups[data.groupId-1].name}</b>
               <p>{data.email}</p>
               <p>Ph : <strong>{data.mobile}</strong></p>
          <div className='action'>
              <button onClick={()=>navigate(`/view-user/${data.id}`)} className="view-button">
              <i className="fa-solid fa-eye"></i>
              </button>
              <button onClick={()=>navigate(`/edit-user/${data.id}`)} className="Edit-button">
              <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button className="Delete-button" onClick={()=>DeleteUser(data.id)} >
              <i className="fa-solid fa-trash-can"></i>
              </button>
          </div>
          </div>
         </div>
         
        </div>
             )
        })}
        
      </div>
     </div>
  </section>
    }
    <section className="users-list mt-0">
       <div className="container">
        <div className="row">
        
         {/*  {state.map((data)=>{
            console.log(data);
               return (
<div className="col-lg-6 mt-4">
           <div className="user d-flex align-items-start">
            <div className="user-pic">
              <img src={data.photo} className="img-fluid" alt="user-pic" />
            </div>
            <div className="user-info">
                 <h4>{data.name}</h4>
                 <span>{data.title}</span>
                 <b>{data.groupId}</b>
                 <p>{data.email}</p>
                 <p>Ph : <strong>{data.mobile}</strong></p>
            <div className='action'>
                <button onClick={()=>navigate("/view-user/:userId")} className="view-button">
                <i className="fa-solid fa-eye"></i>
                </button>
                <button onClick={()=>navigate("/edit-user/:userId")} className="Edit-button">
                <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="Delete-button">
                <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
            </div>
           </div>
           
          </div>
               )
          })} */}
          
        </div>
       </div>
    </section>
    </>
  )
}

export default UserDirectory