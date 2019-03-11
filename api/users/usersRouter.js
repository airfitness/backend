const express = require('express');
const router = express.Router();
const auth = require('../auth/authenticate');
const Users = require('./usersHelper');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    let user = req.body;
    if (!user.username || !user.password || !user.name) {
        res.status (400).json ({error: 'Please provide username, full name, email and password'});
        }
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.register(user)
        .then (user => {
        res.status (201).json({ user });
        })
        .catch (err => res.status (500).json ({error: 'Could not register user.'}));
});

router.post ('/login', (req, res) => {
  const creds = req.body;
    if(!creds.username || !creds.password){
        res.status(400).json({ error: 'Please provide username and password'})
    }
   Users.login(creds.username)
    .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
            const token = Users.generateToken(user);
            const { username, name, email, id } = user;
            res.status (200).json ({ username, name, email, id, token });
        } else {
            res.status (401).json ({ error: 'Bad credentials' });
        }
        })
        .catch (err => {
        res.status (500).json ({error: 'Could not log in user' });
        });
});

router.get('/', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json({ users })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not get users' })
        })
});

module.exports = router