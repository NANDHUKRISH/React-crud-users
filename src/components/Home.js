import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchUsers } from './FetchUsers';
import Spinner from './Spinner';
function Home() {
    const navigate = useNavigate();
    const [query,setQuery]=useState("");
    const [state, setstate] = useState({
        loading: false,
        users: [],
        FilteredUser:[],
        errormessage: '',
        groups: [],
    });

    useEffect(() => {
        const loadusers = async () => {
            try {
                setstate({ ...state, loading: true });
                let response = await FetchUsers.getAllUsers();
                let response1 = await FetchUsers.getAllGroup();
                setstate({ ...state,
                     loading: false,
                     users: response.data,
                     FilteredUser:response.data,
                     groups: response1.data });
            } catch (error) {
                setstate({ ...state, loading: false, errormessage: error.message });
            }
        };

        ( async ()=> await loadusers())();        
    }, []);

    let { loading, users, errormessage,FilteredUser,groups } = state;
    
    const DeleteUser =async (userId) =>{
        let response = await FetchUsers.DeleteUser(userId);
        if(response){
            try{
                setstate({ ...state, loading: true });
                let response = await FetchUsers.getAllUsers();
                let response1 = await FetchUsers.getAllGroup();
                setstate({ ...state,
                     loading: false,
                      users: response.data,
                      FilteredUser:response.data,
                      groups: response1.data });
            }
            catch (error){
                setstate({ ...state, loading: false, errormessage: error.message });
            }
        }
    }

    const SearchData =(e)=>{
      setQuery(e.target.value);
      let theuser=users.filter((user)=>{
        return user.name.toLowerCase().includes(e.target.value.toLowerCase());
      })
      console.log(theuser);
      setstate({...state,FilteredUser:theuser});
    }
    
    return (
        <div className="container-fluid mt-5">
            <div className="card shadow mb-4">
                {/*    <!-- Card Header - Dropdown --> */}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-around">
                    <h5
                        className="m-0 font-weight-bolder"
                        style={{ color: 'rgb(255, 102, 71)', fontWeight: '900', fontSize: '25px' }}
                    >
                        USERS LIST
                    </h5>
                    <form>
                        <div className="input-group">
                            <input 
                            type="text"
                            value={query}
                            onChange={SearchData}
                            placeholder="Search Users.." id="home-search" />
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    style={{ backgroundColor: 'rgb(255, 102, 71)', color: '#fff' }}
                                    id="home-search-button"
                                >
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/*  <!-- Card Body --> */}
                {loading ? (<Spinner/>) : 
                (           
                             <div className="card-body">
                                <main className="table">
                                    <section className="table-body">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>#Id</th>
                                                    <th>Name</th>
                                                    <th>Qualification</th>
                                                    <th>Email-Id</th>
                                                    <th>Designation</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody id="table-body" className="table-body-details">
                                          
                                           { FilteredUser.length > 0 &&
                                             FilteredUser.map((data, index) => {
                                                  return (
                                                <tr className="tablerow" key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.name}</td>
                                                    <td>{groups[data.groupId - 1].name}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data.title}</td>
                                                    <td className="action-tabledata">
                                                        <div className="action-buttons">
                                                             <button
                                                                onClick={() => navigate(`/view-user/${data.id}`)}
                                                                className="view-button"
                                                             >
                                                                <i className="fa-solid fa-eye"></i>
                                                             </button>
                                                             <button
                                                                onClick={() => navigate(`/edit-user/${data.id}`)}
                                                                className="Edit-button"
                                                             >
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </button>
                                                            <button className="Delete-button" onClick={()=>DeleteUser(data.id)} >
                                                                <i className="fa-solid fa-trash-can"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                     );
                                                    })}
                                            </tbody>
                                        </table>
                                    </section>
                                </main>
                            </div>
                   
                )}
            </div>
        </div>
    );
}

export default Home;
