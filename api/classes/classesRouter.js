const express = require('express');
const router = express.Router();
const Classes = require('./classesHelper');
const Instructor = require('../instructors/instructorsHelper');

const { authenticate } = require('../auth/authenticate');

router.get('/', (req, res) => {
    Classes.getClasses()
        .then(classes => {
            res.status(200).json({ classes })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not get classes' })
        })
});

router.get('/types', (req, res) => {
    Classes.getTypes()
        .then(types => {
            res.status(200).json({ types })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not get types' })
        })
});

router.post('/:id/types', (req, res) => {
    const type = req.body.type;
    const classId = req.params.id;
    Classes.addType(type, classId)
        .then(type => {
            res.status(200).json({ type })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not get types' })
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    Classes.getById(id)
        .then(result => {
            Instructor.getById(result.instructorId)
                .then(instructor => {
                            const { id, class_name, instructorId, times, price, location, types } = result;
                            res.status(200).json({
                                id, class_name, 
                                instructorId, 
                                times, 
                                price, 
                                location, 
                                instructorName: instructor.name,
                                instructorUsername: instructor.username, 
                                types
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
    if(!nclass.class_name || !nclass.instructorId || !nclass.price || !nclass.location || !nclass.times){
        res.status(400).json({ error: 'Class name, instructor, price, location and times are required' })
    } else {
        const types = req.body.types ? req.body.types : ['other'];
        Classes.addClass(nclass)
            .then(newClass => {
                const { id, class_name, instructorId, times, price, location } = newClass;
                        Instructor.getById(newClass.instructorId)
                            .then(instructor => {
                                Promise.all(types.map(type => {
                                    console.log(type, id);
                                    Classes.addType(type, id);
                                }))                          
                                .then(nothing => {
                                    console.log('something');
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

router.post('/:id/punch', authenticate, (req, res) => {
    const pcCreds = req.body;
    const classId = req.params.id;
    if(!pcCreds.userId || !pcCreds.price || !pcCreds.instructorId){
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

module.exports = router;