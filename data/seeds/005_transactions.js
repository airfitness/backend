
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('transactions').insert([
        {id: 1, instructorId: 1, classId: 1, userId: 1, price: 75.00},
        {id: 2, instructorId: 1, classId: 3, userId: 1, price: 75.00},
        {id: 3, instructorId: 1, classId: 1, userId: 2, price: 75.00},
        {id: 4, instructorId: 1, classId: 1, userId: 3, price: 75.00},
        {id: 5, instructorId: 1, classId: 3, userId: 4, price: 75.00},
        {id: 6, instructorId: 1, classId: 1, userId: 5, price: 75.00}
      ]);
    });
};
