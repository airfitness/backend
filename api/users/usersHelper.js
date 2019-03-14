const db = require('../../data/dbConfig');

module.exports = {
    register,
    login,
    getUsers,
    getById,
    getPunchCards,
    updateUser,
    removeUser
}

async function register(user){
    const [id] = await db('users').insert(user, 'id');
    return db('users').where({id}).first();
}

function getUsers(){
    return db('users').select('id', 'name', 'username', 'email');
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

async function updateUser(id, item){
    await db('user').where({ id }).update(item);
    return db('user').where({id}).first();
}

function removeUser(id){
    return db('users').where({ id }).del();
}