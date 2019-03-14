const express = require('express');
const router = express.Router();
const { authenticate, generateToken } = require('../auth/authenticate');
const bcrypt = require('bcryptjs');

const Instructors = require('./instructorsHelper');
const Classes = require('../classes/classesHelper');

router.post('/register', (req, res) => {
    let user = req.body;
    if (!user.username || !user.password ) {
        res.status (406).json ({error: 'Please provide username, full name, email and password'});
    }
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Instructors.register(user)
        .then (user => {
            const { username, name, email, id, priv } = user;
            res.status (201).json({ username, name, email, id, priv });
        })
        .catch (err => res.status (500).json ({error: 'Could not register instructor.' }));
});

router.post ('/login', (req, res) => {
  const { username, password} = req.body;
    if(!username || !password){
        res.status(400).json({ error: 'Please provide username and password'})
    }
   Instructors.login(username)
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            const { username, name, email, id, priv } = user;
            res.status(200).json({ priv, username, name, email, id, token });
        } else {
            res.status (401).json ({ error: 'Bad credentials' });
        }
        })
        .catch (err => {
        res.status (500).json ({error: 'Could not log in instructor' });
        });
});

router.get('/', (req, res) => {
    Instructors.getInstructors()
        .then(instructors => {
            res.status(200).json({ instructors })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not get instructors' })
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    Instructors.getById(id)
        .then(instructor => {
            const { username, name, email, bio } = instructor;
            Instructors.getClasses(id)
                .then(classes => {
                    Promise.all(classes.map(async x => {
                        const types = await Classes.getClassTypes(x.id);
                        return {...x, types};
                    }))
                    .then(classes => {
                        res.status(200).json({ username, name, email, bio, classes })
                    })  
                })            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not get instructors' })
        })
});

router.put('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const item = req.body;
    if (req.decoded.id !== id && req.decoded.priv !== 'instructor') {
        return res.status(401).json({ error: 'You are not authorized to edit this account' })
    }
    Instructors.updateInstructor(id, item)
        .then(instructor => {
            res.status(200).json({ instructor })
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not update instructor' })
        })
});

router.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    if (req.decoded.id !== id && req.decoded.priv !== 'instructor') {
        return res.status(401).json({ error: 'You are not authorized to remove this account' })
    }
    Instructor.removeInstructor(req.params.id)
        .then(isRemoved => {
            isRemoved ?
            res.status(204).end()
            : res.status(404).json({ error: 'Instructor does not exist' })
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not remove instructor' })
        })
});
module.exports = router;