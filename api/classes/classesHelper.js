const db = require('../../data/dbConfig');

module.exports = {
    addClass,
    removeClass,
    updateClass,
    getClasses,
    getById,
    newTransaction,
    addPunch,
    addType,
    getClassTypes,
    getTypes,
    punchCard
}

function getClasses(){
    return db('classes');
}

async function getById(id){
    const types = await db('classesTypes').where( 'classId', id );
    const resultClass = await db('classes').where({ id }).first();
    return {...resultClass, types };
}

async function addClass(nclass){
    const [id] = await db('classes').insert(nclass, 'id');
    return db('classes').where({id}).first();
}

function newTransaction(transaction){
    return db('transactions').insert(transaction);
}

function addPunch(userId, classId, transactionId){
    return db('punchCards').insert({ userId, classId, transactionId }, 'id');
}

async function addType(type, classId){
    console.log('adding', type, classId);
    return await db('classesTypes').insert({ type, classId });
}

function getClassTypes(id){
    return db('classesTypes').where('classId', id);
}

function getTypes(){
    return db('classesTypes');
}

async function updateClass(id, item){
    await db('classes').where({ id }).update(item);
    return db('classes').where({id}).first();
}

function removeClass(id){
    return db('classes').where({ id }).del();
}

async function punchCard(id){
    const card = await db('punchCards').where({ id });
    return await db('punchCards').where({ id }).update({ punches_available: card.punches_available - 1})
}