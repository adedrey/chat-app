const User = require('../models/users')
const utils = require('../lib/utils');
const crypto = require("crypto");

// Adds new user
exports.postAddUser = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;
        // Check if email already exist
        const checkEmail = await User.findOne({
            email: email
        });
        // Check if username already exist
        const checkUsername = await User.findOne({
            username: username
        });
        if (checkEmail) {
            return res.status(401).json({
                message: 'Email already exist!'
            })
        }
        if (checkUsername) {
            return res.status(401).json({
                message: 'Username already exist'
            })
        }
        // Check if password and confirm password match
        if (password !== confirm_password) {
            return res.status(401).json({
                message: 'Passwords does not match!'
            })
        }
        const saltHash = utils.genPassword(password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const newuser = await new User({
            name: name,
            email: email,
            username: username,
            hash: hash,
            salt: salt
        })
        const user = await newuser.save()
        if (newuser) {
            const tokenObject = utils.issueJWT(user);
            res.status(200).json({
                success: true,
                user: user,
                token: tokenObject.token,
                expiresIn: tokenObject.expires
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Sorry, we couldn't complete your request. Please try again in a moment."
        })
    }
}

//  User login to the application
exports.postUserLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            username: username
        })
        if (!user) {
            return res.status(401).json({
                message: 'You entered the wrong credentials!'
            })
        }
        const isValid = utils.validPassword(password, user.hash, user.salt)
        if (isValid) {
            const tokenObject = utils.issueJWT(user);
            res.status(200).json({
                success: true,
                user: user,
                token: tokenObject.token,
                expiresIn: tokenObject.expires
            })
        } else {
            return res.status(401).json({
                message: "You entered the wrong credentials!"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Sorry, we couldn't complete your request. Please try again in a moment."
        })
    }
}

