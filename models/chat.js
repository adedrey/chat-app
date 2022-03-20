/**
 * 
 *-------- CHAT ROOM SCHEMA -----------
 * 
 * Defines the chat type, initiator, users and timestamp
 * chat_type: distinguish between private or public message
 * users: contains the users object for private message
 * initiator: contains the initiator user object
 * timestamp: shows created and updated time
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchena = new Schema({
    chat_type: {
        type: String,
        default: "private",
        enum: ["private", "group"]
    },
    users: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    initiator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})


module.exports = mongoose.model('Chat', chatSchena);