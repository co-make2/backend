const express = require('express');
const helmet = require('helmet')
const cors = require('cors');

//add middleware auth here

//add routers here

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//use servers & auth here

server.get('/', (req, res) => {
    res.status(200).json({message: "Co-Make up and running!"})
})

module.exports = server;