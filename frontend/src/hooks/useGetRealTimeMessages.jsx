import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";
import { getSocket } from "../socket";

const useGetRealTimeMessages = () => {
  const dispatch = useDispatch();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (newMessage) => {

      // show message only if it belongs to currently open chat
      if (
        selectedUser &&
        (
          (newMessage.senderId === selectedUser._id && newMessage.receiverId === authUser._id) ||
          (newMessage.senderId === authUser._id && newMessage.receiverId === selectedUser._id)
        )
      ) {
        dispatch(addMessage(newMessage));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };

  }, [dispatch, selectedUser, authUser]);
};

export default useGetRealTimeMessages;