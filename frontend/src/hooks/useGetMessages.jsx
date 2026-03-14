import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  console.log("Selected User:", selectedUser);


  useEffect(() => {
  const fetchMessage = async () => {
    if (!selectedUser?._id) return;

    try {
      axios.defaults.withCredentials = true;

      const res = await axios.get(
        `https://chat-application-1n71.onrender.com/api/v1/message/${selectedUser._id}`
      );

      console.log("Messages:", res.data);
      dispatch(setMessages(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  fetchMessage();
}, [selectedUser, dispatch]);
 // 👈 add dependency
};

export default useGetMessages;
