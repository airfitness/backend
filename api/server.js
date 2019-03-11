const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const server = express();
const user = require('./users/usersRouter');
server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/users', user)

module.exports = server;
