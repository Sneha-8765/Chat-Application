import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // ✅ safer comparison
  const isSender =
    authUser?._id?.toString() === message?.senderId?.toString();

  const profilePhoto = isSender
    ? authUser?.profilePhoto
    : selectedUser?.profilePhoto;

  const messageTime = new Date(message?.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      ref={scroll}
      className={`chat ${isSender ? "chat-end" : "chat-start"} mb-2`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={`https://chat-application-1n71.onrender.com${profilePhoto}`}
            alt="profile"
          />
        </div>
      </div>

      <div className="chat-header text-xs text-white">
        {messageTime}
      </div>

      <div
        className={`chat-bubble ${
          isSender ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;