const db = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET;

module.exports = {
    register,
    login,
    getUsers,
    generateToken,
    // getUserById
}

async function register(user){
    const [id] = await db('users').insert(user, 'id');
    return db('users').where({id}).first();
}

function getUsers(){
    return db('users');
}

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
    }
  
    const options = {
        expiresIn: '1d'
    }
  
    return jwt.sign(payload, jwtKey, options);
  }

function login(username) {

    return db('users')
        .where({ username })
        .first()

}