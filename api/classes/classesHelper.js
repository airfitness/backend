const axios = require('axios');
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');

module.exports = {
    addClass,
    removeClass,
    updateClass,
    getClasses,
    getClassById
}