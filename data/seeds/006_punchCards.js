
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('punchCards').del()
    .then(function () {
      // Inserts seed entries
      return knex('punchCards').insert([
        {id: 1, classId: 1, userId: 1, transactionId: 1},
        {id: 2, classId: 3, userId: 1, transactionId: 2},
        {id: 3, classId: 1, userId: 2, transactionId: 3},

        {id: 4, classId: 1, userId: 3, transactionId: 4},
        {id: 5, classId: 3, userId: 4, transactionId: 5},
        {id: 6, classId: 1, userId: 5, transactionId: 6}

      ]);
    });
};
