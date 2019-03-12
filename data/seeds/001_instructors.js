const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('instructors').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructors').insert([
        {
          "id": 1,
          "name":"A new user",
          "username":"new",
          "email":"anotherfake@fakeemail.com",
          "bio":"A bio",
          "password": bcrypt.hashSync("1234", 12)
        }
      ]);
    });
};
