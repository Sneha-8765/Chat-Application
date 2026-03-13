import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

export const SendInput = () => {

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const { selectedUser } = useSelector(store => store.user)
  const { messages } = useSelector(store => store.message);

  const onSubmitHandler = async (e) => {
  e.preventDefault();

  if (!message.trim()) return;

  try {

    const res = await axios.post(
  `http://localhost:5000/api/v1/message/send/${selectedUser?._id}`,
  { message },
  { withCredentials: true }
);

dispatch(setMessages([...messages, res.data.newMessage]));

setMessage("");

  } catch (error) {
    console.log(error);
  }
};
  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3">
      <div className="w-full relative">

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Send a Message"
          className="border text-sm rounded-b-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"
        />

        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-4"
        >
          <IoSend />
        </button>

      </div>
    </form>
  );
};