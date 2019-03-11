const express = require('express');

// add models

const server = express();

server.use(express.json());

// add routes

module.exports = server;
