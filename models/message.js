/**
 * 
 *-------- MESSAGE SCHEMA -----------
 * 
 * Defines the message, initiator, userId, chatId and timestamp
 * 
 * 
 * message: contains the content of the message, whether string, image or anything
 * userId: contains the user object
 * chat: contains the chat object
 * timestamp: shows created and updated time
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 const messageSchena = new Schema({
     message: Schema.Types.Mixed,
     user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
     },
     chat: {
         type: Schema.Types.ObjectId,
         ref: 'Chat'
     }
 }, {timestamps: true})
 
 
 module.exports = mongoose.model('Message', messageSchena);