const Conversation = require("../models/conversationmodel");
const Message = require("../models/messageModel");
const { getReceiverSocketId, getIO } = require("../socket/socket");

const sendMessage = async (req, res) => {
    try {

        const senderId = req.id.toString();
        const receiverId = req.params.id.toString();
        const { message } = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await conversation.save();

        // ⭐ SOCKET IMPLEMENTATION
        const io = getIO();

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // optional: also emit to sender (helps sync tabs)
        const senderSocketId = getReceiverSocketId(senderId);

        if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json({
            success: true,
            newMessage
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Message sending failed" });
    }
};
const receivedMessage = async (req, res) => {
    try {
        const receiverId = req.id;
        const senderId = req.params.id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        return res.status(200).json(conversation?.messages || []);

    } catch (error) {
        console.log(error);
    }
};

module.exports = { sendMessage, receivedMessage }; 
