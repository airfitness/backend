
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classesTypes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classesTypes').insert([
        {id: 1, type: 'yoga', classId: 1},
        {id: 2, type: 'strength', classId: 1},
        {id: 3, type: 'stretching', classId: 1},

        {id: 4, type: 'martial arts', classId: 2},
        {id: 5, type: 'cardio', classId: 2},
        {id: 6, type: 'dance', classId: 3},

        {id: 7, type: 'endurance', classId: 3},
        {id: 8, type: 'cardio', classId: 4},
        {id: 9, type: 'strength', classId: 4},

        {id: 10, type: 'body weight', classId: 4},
        {id: 11, type: 'cardio', classId: 5},
        {id: 12, type: 'martial arts', classId: 5},

        {id: 13, type: 'strength', classId: 6},
        {id: 14, type: 'dance', classId: 6}
      ]);
    });
};
