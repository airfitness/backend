
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
          "class_name":"Yoga in the Park",
          "location":"somewhere"
        },
        {	
          "id": 2,
          "instructorId": 5,
          "price":100.29,
          "times":"Around noon on mondays",
          "class_name":"Cardio Kickboxing",
          "location":"under the bridge"
        },
        {	
          "id": 3,
          "instructorId": 1,
          "price":100.29,
          "times":"night",
          "class_name":"Dance Dance Revolution",
          "location":"The arcade"
        },
        {	
          "id": 4,
          "instructorId": 2,
          "price":100.29,
          "times":"Tuesdays and Thursdays at 4am",
          "class_name":"I'm calling it a boot camp so you know it's difficult!",
          "location":"My Garage"
        },
        {	
          "id": 5,
          "instructorId": 3,
          "price":100.29,
          "times":"Monday - Wednesday - Friday 7pm",
          "class_name":"Krav Maga with Jillian",
          "location":"The Octagon"
        },
        {	
          "id": 6,
          "instructorId": 4,
          "price":100.29,
          "times":"The closest, dirtiest gym",
          "class_name":"Strength training with the Hulk!",
          "location":"It's a secret"
        },
      ]);
    });
};
