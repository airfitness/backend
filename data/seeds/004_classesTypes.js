
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classesTypes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classesTypes').insert([
        {id: 1, type: 'other', classId: 1},
        {id: 2, type: 'cardio', classId: 1},
        {id: 3, type: 'dance', classId: 1}
      ]);
    });
};
