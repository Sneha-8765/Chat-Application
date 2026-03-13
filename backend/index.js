const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { initSocket } = require("./socket/socket");

dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ create HTTP server

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("SERVER WORKING");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
app.use("/uploads", express.static("uploads"));

connectDB();

initSocket(server); // ✅ attach socket

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {   // ✅ start server
  console.log(`Server listening at port ${PORT}`);
});