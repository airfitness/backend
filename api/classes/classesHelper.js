const db = require('../../data/dbConfig');

module.exports = {
    addClass,
    // removeClass,
    // updateClass,
    getClasses,
    // getClassById
}

function getClasses(){
    return db('classes');
}

async function addClass(nclass){
    const [id] = await db('classes').insert(nclass, 'id');
    return db('classes').where({id}).first();
}