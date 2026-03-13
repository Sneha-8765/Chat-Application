const express = require("express");


const router = express.Router();
const {
  register,
  login,
  logOut,
  getOtherUsers
} = require("../controllers/userController");

const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/upload");
const { updateProfilePhoto } = require("../controllers/userController");




router.post("/register", register);
router.post("/login", login);
router.get("/logOut", logOut);
router.get("/", isAuthenticated ,getOtherUsers);
router.post(
  "/update-photo",
  isAuthenticated,
  upload.single("profilePhoto"),
  updateProfilePhoto
);

module.exports = router;
