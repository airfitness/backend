const express = require('express');
const router = express.Router();
const Classes = require('./classesHelper');
const Instructor = require('../instructors/instructorsHelper');

const { authenticate } = require('../auth/authenticate');

router.get('/', (req, res) => {
    Classes.getClasses()
        .then(classes => {
            Promise.all(classes.map(async x => {
                const types = await Classes.getClassTypes(x.id);
                return {...x, types};
            }))             
            .then(classes => {
                res.status(200).json({ classes })
            })            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not get classes' })
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    Classes.getById(id)
        .then(result => {
            !result.id ?
            res.status(404).json({ error: 'Class does not exist' }) :
            Instructor.getById(result.instructorId) // Adds instructor data to response
                .then(instructor => {
                    Classes.getCards(id) // Adds related punch cards to response
                        .then(cards => {
                            const { id, class_name, instructorId, times, price, location, types } = result;
                            res.status(200).json({
                                id, class_name, 
                                instructorId, 
                                times, 
                                price, 
                                location, 
                                instructorName: instructor.name,
                                instructorUsername: instructor.username, 
                                types,
                                cards
                            })
                        })
                    })
                })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not get classes' })
        })
});

// *** add class ***
router.post('/', authenticate, (req, res) => {
    const nclass = req.body.addedClass;
    if (req.decoded.priv !== 'instructor') {
        return res.status(401).json({ error: 'You are not authorized to create a class' })
    } else if(!nclass.class_name || !nclass.instructorId || !nclass.price || !nclass.location || !nclass.times){
        res.status(400).json({ error: 'Class name, instructor, price, location and times are required' })
    } else {
        const types = req.body.types ? req.body.types : [];
        Classes.addClass(nclass)
            .then(newClass => {
                const { id, class_name, instructorId, times, price, location } = newClass;
                        Instructor.getById(newClass.instructorId)
                            .then(instructor => {
                                Promise.all(types.map(type => { // Maps over an array of types and inserts them individually
                                    type = type.toLowerCase();
                                    Classes.addType(type, id);
                                }))                          
                                .then(nothing => {
                                    Classes.getClassTypes(id)
                                        .then(t => {
                                            res.status(200).json({
                                                id, class_name, 
                                                instructorId, 
                                                times, 
                                                price, 
                                                location, 
                                                instructorName: instructor.name,
                                                instructorUsername: instructor.username,
                                                types: t
                                            })
                                        })
                                })      
                            })
                        })           
            .catch(err => {
                res.status(500).json({ error: 'Could not add class' })
            })
    }
});

// *** Make a transaction and add a punch card ***
router.post('/:id/punch', authenticate, (req, res) => {
    const pcCreds = req.body;
    const classId = req.params.id;
    if (req.decoded.id !== pcCreds.userId && req.decoded.priv !== 'user') {
        return res.status(401).json({ error: 'Unauthorized' })
    } else if(!pcCreds.userId || !pcCreds.price || !pcCreds.instructorId){
        res.status(400).json({ error: 'User ID, instructor ID and price required' })
    } else {
        Classes.newTransaction({...pcCreds, classId})
            .then(transactionId => {
                Classes.addPunch(pcCreds.userId, classId, transactionId[0] )
                    .then(id => {
                        res.status(201).json({ message: 'Punch card added!', id: id[0]})
                    })
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not create punch card' })
            })
    }
});

// *** update class ***
router.put('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const item = req.body;
    if (req.decoded.priv !== 'instructor') {
        return res.status(401).json({ error: 'You are not authorized to update this class' })
    }
    Classes.updateClass(id, item)
        .then(updatedClass => {
            res.status(200).json({ updatedClass })
        })
        .catch(err => {
            res.status(500).json({ error: 'could not update class' })
        })
});

//*** Punch it! Punch cards for class ***
router.put('/:id/punchit', authenticate, (req, res) => {
    const card = req.body.card;
    const instructorId = req.body.instructorId;
    if (instructorId !== req.decoded.id && req.decoded.priv !== 'instructor') {
        return res.status(401).json({ error: 'You are not authorized to punch these cards' })
    } else {
            Classes.punchCard(card)
        .then(punchCard => {
            res.status(200).json({ message: 'Cards punched!', punchCard })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not punch cards' })
        })
    } 
});

// *** delete class ***
router.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    if (req.decoded.id !== id && req.decoded.priv !== 'instructor') {
        return res.status(401).json({ error: 'You are not authorized to remove this class' })
    }
    Classes.removeClass(id)
        .then(isRemoved => {
            isRemoved ?
            res.status(204).end()
            : res.status(404).json({ error: 'Class does not exist' })
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not remove class' })
        })
});

// *** types routes ***

router.post('/:id/types', (req, res) => {
    const type = req.body.type;
    const classId = req.params.id;
    Classes.addType(type, classId)
        .then(type => {
            res.status(200).json({ type })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could add type' })
        })
});

router.delete('/:id/types', (req, res) => {
    const typeId = req.params.id;
    Classes.delType(typeId)
        .then(isDel => {
            isDel ?
            res.status(204).end()
            : res.status(404).json({ error: 'Type does not exist' })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not remove type' })
        })
});

module.exports = router;