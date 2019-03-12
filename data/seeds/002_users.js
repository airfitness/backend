const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          "id": 1,
          "name":"A new user",
          "username":"user",
          "email":"anotherfake@fakeemail.com",
          "password": bcrypt.hashSync("1234", 12)
        }
      ]);
    });
};
