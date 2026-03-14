import React, { useEffect } from "react";
import { SendInput } from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelecteduser } from "../redux/userSlice";
import useGetRealTimeMessages from "../hooks/useGetRealTimeMessages";
const MessageContainer = () => {
   useGetRealTimeMessages();
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(setSelecteduser(null));
  }, []);

  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[700px] flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 p-3 bg-zinc border-b">
            {/* Avatar */}
            <div className="relative">
              <img
                src={`https://chat-application-1n71.onrender.com${selectedUser?.profilePhoto}`}
                alt="user-profile"
                className="w-12 h-12 rounded-full object-cover"
              />

              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Username */}
            <p className="font-semibold text-lg text-white">
              {selectedUser?.fullName}
            </p>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className="md:min-w-[700px] flex flex-col  justify-center items-center">
          <h1 className="text-4xl font-bold text-white">
            {" "}
            Hi,{authUser?.fullName}
          </h1>
          <h1 className="text-2xl text-white">Let's start conversation</h1>
        </div>
      )}
    </>
  );
};
export default MessageContainer;
