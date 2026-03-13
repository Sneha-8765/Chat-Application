const express = require("express");
const {sendMessage}= require("../controllers/messageController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {receivedMessage} = require("../controllers/messageController");

const router = express.Router();

router.post("/send/:id",isAuthenticated ,sendMessage);
router.get("/:id",isAuthenticated ,receivedMessage);


module.exports = router;