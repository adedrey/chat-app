/**
 * VALIDATES USER AUTHENTICATION
 */
const jwt = require('jsonwebtoken');
const User = require("../models/users");
const path = require('path');
const fs = require('fs');
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
module.exports = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, PRIV_KEY);
        const userId = decodedToken.sub;
        const user = await User.findOne({_id: userId});
        if (!user) {
            return res.status(401).json({
                message: 'Sorry, there was a problem authenticating the user.'
            });
        }
        req.user = user;
        next();
    } catch(err) {
        console.log(err);
        res.status(401).json({
            message : 'Sorry, there was a problem authenticating the user.'
        });
    }
}