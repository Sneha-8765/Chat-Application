import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // ✅ Basic Validation
    if (
      !user.fullName ||
      !user.userName ||
      !user.password ||
      !user.confirmPassword ||
      !user.gender
    ) {
      return toast.error("All fields are required ❌");
    }

    if (user.password !== user.confirmPassword) {
      return toast.error("Passwords do not match ❌");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        user
      );

      console.log("Response:", res.data);

      toast.success("Signup Successful 🎉");

      // Optional: Clear form
      setUser({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Signup Failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-8 bg-gray-400/10 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center text-green-300 mb-6">
          Signup
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-4 text-left">

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Full Name
            </label>
            <input
              value={user.fullName}
              onChange={(e) =>
                setUser({ ...user, fullName: e.target.value })
              }
              type="text"
              placeholder="Full Name"
              className="w-full input input-bordered h-10 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              UserName
            </label>
            <input
              value={user.userName}
              onChange={(e) =>
                setUser({ ...user, userName: e.target.value })
              }
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
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              type="password"
              placeholder="Password"
              className="w-full input input-bordered h-10 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Confirm Password
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10 text-white"
            />
          </div>

          <div className="flex items-center gap-4 my-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) =>
                  setUser({ ...user, gender: e.target.value })
                }
              />{" "}
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) =>
                  setUser({ ...user, gender: e.target.value })
                }
              />{" "}
              Female
            </label>
          </div>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
