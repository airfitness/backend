const db = require('../../data/dbConfig');

module.exports = {
    register,
    login,
    getInstructors,
    getById,
    getClasses,
    updateInstructor,
    removeInstructor
}

async function register(instructor){
    const [id] = await db('instructors').insert(instructor, 'id');
    return db('instructors').where({id}).first();
}

function getInstructors(){
    return db('instructors').select('id', 'username', 'name', 'email', 'bio');
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

async function updateInstructor(id, item){
    await db('instructors').where({ id }).update(item);
    return db('instructors').where({id}).first();
}

function removeInstructor(id){
    return db('instructors').where({ id }).del();
}