const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    const secret = secrets.jwSecret;

    jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
            console.log(error)
            res.status(401).json({message: "Authorization via webToken failed"})
        } else {
            req.decodedToken = decodedToken
            next()
        }
    })
}