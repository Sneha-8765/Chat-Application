import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setSelecteduser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector(store => store.user);

  const selectedUserHandler = (user) => {
    dispatch(setSelecteduser(user));
  };

  // ✅ Check if this user is online
  const isOnline = onlineUsers?.includes(user?._id);

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${selectedUser?._id == user?._id ? 'bg-zinc-200' : ''
          } flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer`}
      >

        {/* Avatar */}
        <div className="avatar relative">
          <div className="w-14 rounded-full">
            <img
              src={`https://chat-application-1n71.onrender.com${user?.profilePhoto}`}
              alt="user-profile"
            />
          </div>

          {/* ✅ Show Green Dot ONLY if Online */}
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>

        {/* Username */}
        <div className="flex-1">
          <p className="font-medium">{user?.fullName}</p>
          <p className="text-xs text-gray-500">
            {isOnline ? "Online" : ""}
          </p>
        </div>

      </div>

      {/* Divider BELOW row */}
      <div className="divider my-0"></div>
    </>
  )
}

export default OtherUser;