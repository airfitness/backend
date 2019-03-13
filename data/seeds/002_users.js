const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          "id": 1,
          "name":"Jerry Smith",
          "username":"jerry",
          "email":"jerry@fakeemail.com",
          "password": bcrypt.hashSync("1234", 12)
        },
        {
          "id": 2,
          "name":"Morty",
          "username":"morty",
          "email":"morty@fakeemail.com",
          "password": bcrypt.hashSync("1234", 12)
        },
        {
          "id": 3,
          "name":"Jessica",
          "username":"jessica",
          "email":"jessica@fakeemail.com",
          "password": bcrypt.hashSync("1234", 12)
        },
        {
          "id": 4,
          "name":"Bird Person",
          "username":"BirdPerson",
          "email":"bird@fakeemail.com",
          "password": bcrypt.hashSync("1234", 12)
        },
        {
          "id": 5,
          "name":"Gandalf",
          "username":"TheGrey",
          "email":"gando@fakeemail.com",
          "password": bcrypt.hashSync("1234", 12)
        }
      ]);
    });
};
