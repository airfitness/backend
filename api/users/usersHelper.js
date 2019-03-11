const db = require('../../data/dbConfig');

module.exports = {
    register,
    login,
    getUsers,
    getById,
    getPunchCards
}

async function register(user){
    const [id] = await db('users').insert(user, 'id');
    return db('users').where({id}).first();
}

function getUsers(){
    return db('users');
}

function getById(id){
    return db('users').where({ id }).first();
}

function login(username) {
    return db('users')
        .where({ username })
        .first()
}

function getPunchCards(id){
    return db('punchCards').where({ userId: id })
}