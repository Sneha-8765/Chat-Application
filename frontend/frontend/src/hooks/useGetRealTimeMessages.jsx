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

    socket.on("newMessage", (newMessage) => {

      if (
        selectedUser &&
        (
          (newMessage.senderId === authUser._id && newMessage.receiverId === selectedUser._id) ||
          (newMessage.senderId === selectedUser._id && newMessage.receiverId === authUser._id)
        )
      ) {
        dispatch(addMessage(newMessage));
      }

    });

    return () => socket.off("newMessage");

  }, [selectedUser, authUser]);

};

export default useGetRealTimeMessages;