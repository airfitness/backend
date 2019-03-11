const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const server = express();
const user = require('./users/usersRouter');
const instructor = require('./instructors/instructorsRouter');
server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/users', user);
server.use('/api/instructors', instructor);

module.exports = server;
