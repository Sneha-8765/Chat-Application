import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { connectSocket } from "../socket";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://chat-application-1n71.onrender.com/api/v1/user/login",
        user,
        { withCredentials: true },
      );

      console.log("Response:", res.data);

      // ✅ Success Toast
      toast.success("Login Successful 🎉");

      dispatch(setAuthUser(res.data));

      connectSocket(res.data._id);

      navigate("/"); // or navigate("/home")
    } catch (error) {
      console.log(error);

      // ❌ Error Toast
      toast.error(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-8 bg-gray-400/10 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-300 mb-6">
          Login
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Username
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              type="text"
              placeholder="email"
              className="w-full input input-bordered h-10 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Password
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password"
              className="w-full input input-bordered h-10 text-white"
            />
          </div>

          <p className="text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Signup
            </Link>
          </p>

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
