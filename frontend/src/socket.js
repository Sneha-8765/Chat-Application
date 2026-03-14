import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io("https://chat-application-1n71.onrender.com", {
    query: { userId },
    transports: ["websocket"],   // important
    withCredentials: true
  });
};

export const getSocket = () => socket;