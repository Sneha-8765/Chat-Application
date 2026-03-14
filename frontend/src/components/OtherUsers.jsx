import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";

const OtherUsers = ({ users }) => {
  useGetOtherUsers();

  if (!users) return null;

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;