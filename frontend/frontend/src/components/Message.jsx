import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector(store => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // detect sender
  const isSender = authUser?._id === message?.senderId;

  // choose correct photo
  const profilePhoto = isSender
    ? authUser?.profilePhoto
    : selectedUser?.profilePhoto;

  // format message time
  const messageTime = new Date(message?.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div ref={scroll} className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}>

      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="profile"
            src={`http://localhost:5000${profilePhoto}`}
          />
        </div>
      </div>

      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">
          {messageTime}
        </time>
      </div>

      <div className="chat-bubble">
        {message?.message}
      </div>

      <div className="chat-footer opacity-50"></div>

    </div>
  )
}

export default Message;