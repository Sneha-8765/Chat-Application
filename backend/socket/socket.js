const { Server } = require("socket.io");

let io;
const userSocketMap = {};

const initSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "https://chat-application-1n71.onrender.com",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {

        console.log("User connected:", socket.id);

        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap[userId] = socket.id;
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {

            console.log("User disconnected:", socket.id);

            delete userSocketMap[userId];

            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });
};

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = {
    initSocket,
    getReceiverSocketId,
    getIO
};