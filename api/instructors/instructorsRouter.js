const express = require('express');
const router = express.Router();
const auth = require('../auth/authenticate');
const Instructors = require('./instructorsHelper');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    let user = req.body;
    if (!user.username || !user.password || !user.name || !user.bio) {
        res.status (400).json ({error: 'Please provide username, full name, email, bio and password'});
    }
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Instructors.register(user)
        .then (user => {
            const { username, name, email, id } = user;
            res.status (201).json({ username, name, email, id });
        })
        .catch (err => res.status (500).json ({error: 'Could not register instructor.' }));
});

router.post ('/login', (req, res) => {
  const creds = req.body;
    if(!creds.username || !creds.password){
        res.status(400).json({ error: 'Please provide username and password'})
    }
   Instructors.login(creds.username)
    .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
            const token = auth.generateToken(user);
            const { username, name, email, id } = user;
            res.status (200).json ({ username, name, email, id, token });
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
                    res.status(200).json({ username, name, email, bio, classes })
                })            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not get instructors' })
        })
});

module.exports = router;