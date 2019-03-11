const db = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    register,
    login,
    getInstructors,
    // getUserById
}

async function register(instructor){
    const [id] = await db('instructors').insert(instructor, 'id');
    return db('instructors').where({id}).first();
}

function getInstructors(){
    return db('instructors');
}

function login(username) {

    return db('instructors')
        .where({ username })
        .first()

}