
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {	
          "id": 1,
          "instructorId": 1,
          "price":100.29,
          "times":"Sometime",
          "class_name":"Another new class",
          "location":"somewhere"}
      ]);
    });
};
