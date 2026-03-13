import React from 'react'
import Message from './Message'
import useGetRealTimeMessages from '../hooks/useGetRealTimeMessages'
import { useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";
const Messages = () => {
   useGetMessages();
  useGetRealTimeMessages();

  const { messages } = useSelector((store) => store.message);

  // ✅ safety check
  if (!Array.isArray(messages)) {
    return null;
  }

  return (
    <div className='flex-1 overflow-y-auto p-4'>
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  )
}

export default Messages;