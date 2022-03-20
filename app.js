/**
 * Import libraries, routers, controllers, database connection
 */

// Import Libraries
const express = require('express');
const cors = require('cors');
const passport = require('passport')
const path = require('path')

// Configure environment variables
require("dotenv").config()

// Import Database
const connectDB = require('./config/database');

// Import Routers
const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');

// Set up Express
const app = express();

/**
 *--------- GENERAL SETUP -------------
 */


// Connect to Database
connectDB()

// Pass the global passport object into the configuration function
require('./config/passport')(passport)

// Initialize the passport object on every request
app.use(passport.initialize());

// Express body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Set up cors - GET, POST, PUT, PATCH, and other REQUEST
app.use(cors());

// Set up Routers
app.use('/api', authRouter);
app.use('/api/chat', chatRouter);




module.exports = app;