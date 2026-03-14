import React, { useState, useEffect } from 'react'
import { BsSearch } from "react-icons/bs";
import OtherUsers from './OtherUsers';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Sidebar = () => {

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { otherUsers, authUser } = useSelector(store => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredUsers(otherUsers);
  }, [otherUsers]);

  // logout
  const logoutHandler = async()=>{
    try{
       const res = await axios.get('https://chat-application-1n71.onrender.com/api/v1/user/logOut');
       navigate("/login");
       toast.success(res.data.message);
       dispatch(setAuthUser(null));
    }catch(error){
      console.log(error);
    }
  }

  // search users
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setFilteredUsers(otherUsers);
      return;
    }

    const results = otherUsers.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (results.length > 0) {
      setFilteredUsers(results);
    } else {
      toast.error("User Not Found!");
      setFilteredUsers([]);
    }
  };

  // profile photo change
  const handlePhotoChange = async (e) => {

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/v1/user/update-photo",
        formData,
        { withCredentials: true }
      );

      dispatch(setAuthUser({
        ...authUser,
        profilePhoto: res.data.profilePhoto
      }));

      toast.success("Profile photo updated");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col w-full md:w-[350px]'>

      {/* Logged in user avatar (WhatsApp style) */}
      <div className="flex items-center gap-3 mb-4">

        <label className="cursor-pointer">

          <div className="avatar">
            <div className="w-14 rounded-full">
              <img
                src={`http://localhost:5000${authUser?.profilePhoto}`}
                alt="profile"
              />
            </div>
          </div>

          {/* hidden file input */}
          <input
            type="file"
            className="hidden"
            onChange={handlePhotoChange}
          />

        </label>

        <p className="font-semibold">
          {authUser?.fullName}
        </p>

      </div>


      {/* Search Section */}
      <form onSubmit={searchSubmitHandler} className='flex items-center gap-2'>
        <input  
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="input input-bordered rounded-md bg-white flex-1"
          type="text" 
          placeholder='Search' 
        />

        <button  
          type="submit" 
          className='btn btn-circle bg-zinc-500 text-white'
        >
          <BsSearch />
        </button>
      </form>

      <div className="divider my-4"></div>

      {/* Users List */}
      <div className="flex-1 overflow-auto">

        <OtherUsers users={filteredUsers}/>

        <div className='mt-2'> 
          <button onClick={logoutHandler} className='btn btn-sm'>
            Logout
          </button>
        </div>

      </div>

    </div>
  )
}

export default Sidebar