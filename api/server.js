const express = require('express');
const helmet = require('helmet')
const cors = require('cors');

//add middleware auth here
const theAuthorizer = require('../auth/auth-mw.js');

//add routers here
const usersRouter = require('../users/users-router.js')
const categoriesRouter = require('../categories/categories-router.js')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//use servers & auth here
server.use('/api/users', usersRouter);
server.use('/api/categories', categoriesRouter)

server.get('/', (req, res) => {
    res.status(200).json({message: "Co-Make up and running!"})
})

module.exports = server;