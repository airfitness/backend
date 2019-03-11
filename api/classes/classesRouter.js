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

router.get('/:id', (req, res) => {
    Classes.getById(req.params.id)
        .then(result => {
            Instructor.getById(result.instructorId)
                .then(instructor => {
                    const { id, class_name, instructorId, times, price, location } = result;
                    res.status(200).json({ id, class_name, instructorId, times, price, location, instructorName: instructor.name, instructorUsername: instructor.username })
                })           
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not get classes' })
        })
});

router.post('/', (req, res) => {
    const nclass = req.body;
    if(!nclass.class_name || !nclass.instructorId || !nclass.price || !nclass.location || !nclass.times){
        res.status(400).json({ error: 'Class name, instructor, price, location and times are required' })
    } else {
        Classes.addClass(nclass)
            .then(newClass => {
                res.status(201).json({ newClass })
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not add class' })
            })
    }
});

module.exports = router;