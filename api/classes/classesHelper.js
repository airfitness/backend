const db = require('../../data/dbConfig');

module.exports = {
    addClass,
    // removeClass,
    // updateClass,
    getClasses,
    getById,
    newTransaction,
    addPunch,
}

function getClasses(){
    return db('classes');
}

function getById(id){
    return db('classes').where({ id }).first();
}

async function addClass(nclass){
    const [id] = await db('classes').insert(nclass, 'id');
    return db('classes').where({id}).first();
}

function newTransaction(transaction){
    return db('transactions').insert(transaction);
}

function addPunch(userId, classId, transactionId){
    return db('punchCards').insert({ userId, classId, transactionId });
}