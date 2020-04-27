const secrets = require('../api/secrets.js');
const jwt = require('jsonwebtoken');

module.exports = {
    generateToken
}

function generateToken(user){
    const payload = {
        userId: user.id,
        username: user.username,
        zip: user.zip
    };

    const secret = secrets.jwSecret;

    const options = {
        expiresIn: "1d"
    }

    return jwt.sign(payload, secret, options)
}