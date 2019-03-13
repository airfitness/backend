const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('instructors').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructors').insert([
        {
          "id": 1,
          "name":"Richard Simmons",
          "username":"RichardSimmons",
          "email":"richard@simmons.fake",
          "bio":"The New Orleans native known for his outlandish outfits and larger-than-life personality (complete with micro-mini shorts) captured America's attention in the late 70s by sharing his own personal weight loss journey and sparked an aerobics craze in the 90s with his series of Sweatin' to the Oldies videos.",
          "password": bcrypt.hashSync("1234", 12)
        },
        {
          "id": 2,
          "name":"Denise Austin",
          "username":"d_austin",
          "email":"d@fakeemail.com",
          "bio":"America’s Fitness Sweetheart has embraced a healthy lifestyle and shared her secrets for success since the 80s, but she has never slowed down! Over the years, Austin has sold more than 24 million videos and starred in several fitness-related TV shows, most notably the Jack LaLanne Show in 1981.",
          "password": bcrypt.hashSync("1234", 12)
        },
        {
          "id": 3,
          "name":"Jillian Michaels",
          "username":"j_michaels",
          "email":"j@fakeemail.com",
          "bio":"Jillian Michaels is an American personal trainer, businesswoman, author and television personality from Los Angeles, California. Michaels is best known for her appearances on NBC's The Biggest Loser and Losing It with Jillian.",
          "password": bcrypt.hashSync("1234", 12)
        },
        {
          "id": 4,
          "name":"Lou Ferrigno",
          "username":"the_hulk",
          "email":"hulk@fakeemail.com",
          "bio":"I'm the hulk.",
          "password": bcrypt.hashSync("1234", 12)
        },
        {
          "id": 5,
          "name":"Mike Tyson",
          "username":"IronMike",
          "email":"mike@fakeemail.com",
          "bio":"Iron Mike Tyson want you to get in shape, maybe do some cardio kick-boxing",
          "password": bcrypt.hashSync("1234", 12)
        }
      ]);
    });
};
