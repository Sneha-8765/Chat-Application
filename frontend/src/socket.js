import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io("http://localhost:5000", {
    query: { userId }
  });
};

export const getSocket = () => socket;