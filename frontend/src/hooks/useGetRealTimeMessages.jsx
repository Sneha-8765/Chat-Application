import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";
import { getSocket } from "../socket";

const useGetRealTimeMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (newMessage) => {

  if (!selectedUser) return;

  // show message if it belongs to current chat
  if (
    newMessage.senderId === selectedUser._id ||
    newMessage.receiverId === selectedUser._id
  ) {
    dispatch(addMessage(newMessage));
  }

};

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };

  }, [dispatch, selectedUser]);
};

export default useGetRealTimeMessages;