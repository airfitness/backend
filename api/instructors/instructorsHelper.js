const db = require('../../data/dbConfig');

module.exports = {
    register,
    login,
    getInstructors,
    getById,
    getClasses
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

function getById(id){
    return db('instructors').where({id}).first();
}

function getClasses(id){
    return db('classes').where({ instructorId: id});
}