const express = require('express');
const router = express.Router();
const { authenticate, generateToken } = require('../auth/authenticate');
const Users = require('./usersHelper');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    let user = req.body;
    if (!user.username || !user.password ) {
        res.status (406).json ({error: 'Please provide username, email and password'});
        }
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.register(user)
        .then (user => {
            const { username, name, email, id, priv } = user;
            res.status (201).json({ username, name, email, id, priv  });
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
            const token = generateToken(user);
            const { username, name, email, id, priv } = user;
            res.status (200).json ({ priv, username, name, email, id, token });
        } else {
            res.status (401).json ({ error: 'Bad credentials' });
        }
        })
        .catch (err => {
        res.status (500).json ({error: 'Could not log in user', err: err.message });
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

router.get('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    if (req.decoded.id !== id && req.decoded.priv !== 'user') {
        return res.status(401).json({ error: 'You are not authorized' })
    }
    Users.getById(id)
        .then(user => {
            Users.getPunchCards(id)
                .then(punchCards => {
                    const { username, name, id, email } = user;
                    res.status(200).json({ username, name, id, email, punchCards })
                })            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not get user' })
        })
});

module.exports = router