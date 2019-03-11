const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const server = express();

const users = require('./users/usersRouter');
const instructors = require('./instructors/instructorsRouter');
const classes = require('./classes/classesRouter');

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/users', users);
server.use('/api/instructors', instructors);
server.use('/api/classes', classes);

module.exports = server;
