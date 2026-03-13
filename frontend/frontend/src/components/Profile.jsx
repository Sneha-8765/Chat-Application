import React, { useState } from "react";
import axios from "axios";

const Profile = () => {

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {

      const res = await axios.post(
  "http://localhost:5000/api/v1/user/update-photo",
  formData,
  { withCredentials: true }
);

      console.log(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>

      <h2>Update Profile Photo</h2>

      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUpload}>
        Upload
      </button>

    </div>
  );
};

export default Profile;