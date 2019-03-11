const express = require('express');
const router = express.Router();
const auth = require('../auth/authenticate');
const Users = require('./usersHelper');
const bcrypt = require('bcryptjs')

router.post('/users/register', (req, res) => {
    let user = req.body;
    if (!user.username || !user.password || !user.name) {
        res.status (400).json ({error: 'Please provide username, full name and password'});
        }
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.register(user)
        .then (user => {
        res.status (201).json({ user });
        })
        .catch (err => res.status (500).json ({error: 'Could not register user.'}));
});

router.post ('users/login', (req, res) => {
  const creds = req.body;
    if(!creds.username || !creds.password){
        res.status(400).json({ error: 'Please provide username and password'})
    }
   Users.login(creds)
   .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = auth.generateToken (user);
        res.status (200).json ({id: user.id, username: user.username, name: user.name, email: user.email, token});
      } else {
        res.status (401).json ({ error: 'Authentication needed' });
      }
    })
    .catch (err => {
      res.status (500).json ({error: 'Could not log in user' });
    });
});

module.exports = router