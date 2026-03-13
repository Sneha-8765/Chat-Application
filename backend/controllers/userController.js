const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const exists = await User.findOne({ userName });
    if (exists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePhoto =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${userName}`
        : `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const user = await User.create({
  fullName,
  userName,
  password: hashedPassword,
  profilePhoto,
  gender
});

// send welcome email
await sendEmail(
  userName,
  "Welcome to Chat App 🎉",
  `Hello ${fullName}, your account has been created successfully!`
);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

//login code 
const login = async (req, res) => {
  try {
     const {  userName, password } = req.body;
     if ( !userName || !password ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "incorrect username or passwprd" ,success:false})
    };
    const isPasswordMatch = await bcrypt.compare(password,user.password)
    if(!isPasswordMatch){
      return res.status(400).json({ message: "incorrect username or passwprd" ,success:false})
    }
    const tokenData ={
      userId : user._id
    }
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
    return res.status(200).cookie("token",token, {maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
      _id:user._id,
      username:user.userName,
      fullName:user.fullName,
      profilePhoto:user.profilePhoto

    });
  }catch{
     console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
//logout
const logOut=  (req,res) =>{
  try{
       return res.status(200).cookie("token","", {maxAge:0}).json({
      message:"logout successfully"

    });
  }catch(error){
    return res.status(500).json({ error: "Server error" });
  }
}

//getotherusers
const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;

    const otherUsers = await User.find({
      _id: { $ne: loggedInUserId }
    }).select("-password");

    return res.status(200).json(otherUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const updateProfilePhoto = async (req, res) => {
  try {

    const userId = req.id;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const photoUrl = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePhoto: photoUrl },
      { new: true }
    );

    return res.status(200).json({
      message: "Profile photo updated",
      profilePhoto: user.profilePhoto
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register ,login , logOut,getOtherUsers,updateProfilePhoto };