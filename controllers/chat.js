// Import Models
const Message = require('../models/message')
const Chat = require('../models/chat')

// Import Socket
const io = require('../socket');

// Cloudinary for processing images
const { cloudinary } = require('../config/cloudinary');


// POST for General Users
exports.postGeneralChat = async(req, res, next) => {
    try {
        let { message } = req.body;
        // Check if message is an Image
        let base64regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
        if (base64regex.test(message)) {
            // Store image in cloudinary
            console.log("cloudinary")
            const uploadResponse = await cloudinary.uploader.upload(message, {
                upload_preset: 'chat_task_img'
            });
            // convert image into an Object. Remember message ca take any type
            message = {url: uploadResponse.url, id: uploadResponse.public_id}
        }
        // Save message
        const save_message = await Message({
            message: message,
            user: req.user
        })
        // Update Client of a POST Action with saved Message using SOCKET.IO
        // The Client can then push to the object into the list of messages
        io.getIO().emit('general_message', {
            action: 'post_message',
            message: save_message
        })

        res.status(200).json({
            message: save_message
        });
        
    } catch (err) {
        console.log(err)
        // return error message to the client
        res.status(500).json({
            message: "Sorry, we couldn't complete your request. Please try again in a moment."
        })
    }

}

// GET ALL PUBLIC CHAT

exports.getGeneralChat = async(req, res, next) => {
    try {
        // Get all messages
        const messages = await Customer.find();
        // Send response to the clients
        res.status(200).json({
            messages: messages
        })
    } catch (err) {
        console.log(err)
        // return error message to the client
        res.status(500).json({
            message: "Sorry, we couldn't complete your request. Please try again in a moment."
        })
    }
}

// Delete message

exports.deleteGeneralChat = async(req, res, next) => {
    try {
        // Get message ID
        const { messageId } = req.params.messageId;
        const delete_message = await Message.findOneAndDelete({
            _id: messageId
        })
        // return error message to the client if not found
        if (!delete_message) {
            return res.status(401).json({
                message: "Unable to delete"
            })
        }
        // Update Client of a delete action
        // Sends Message ID so that the client developer can pop the object 
        // from the list using messageId
        io.getIO().emit('general_message', {
            action: 'delete',
            messageId: messageId
        });
        // Send response to the clients
        res.status(200).json({
            message: 'Deleted Successfully'
        })
    } catch (err) {
        console.log(err)
        // return error message to the client
        res.status(500).json({
            message: "Sorry, we couldn't complete your request. Please try again in a moment."
        })
    }
}