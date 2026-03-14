import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { selectedUser } = useSelector((store) => store.user);

  return (
    <div className="flex h-screen w-full">

      {/* Sidebar */}
      <div
        className={`${
          selectedUser ? "hidden md:block" : "block"
        } w-full md:w-1/3 lg:w-1/4 border-r`}
      >
        <Sidebar />
      </div>

      {/* Chat */}
      <div
        className={`${
          selectedUser ? "block" : "hidden md:block"
        } w-full md:w-2/3 lg:w-3/4`}
      >
        <MessageContainer />
      </div>

    </div>
  );
};

export default HomePage;