import React, { useRef, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { setOnlineUsers } from "./redux/userSlice";
import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  const socketRef = useRef(null);
  const { authUser } = useSelector((store) => store.user);

  const dispatch = useDispatch();

useEffect(() => {
  if (authUser) {
    socketRef.current = io("http://localhost:5000", {
      query: { userId: authUser._id }
    });

    socketRef.current.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("getOnlineUsers"); // remove listener
        socketRef.current.disconnect(); // or socketRef.current.close()
        socketRef.current = null;
      }
    };
  }
}, [authUser, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;