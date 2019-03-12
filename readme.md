Deployed to https://airfitness.herokuapp.com

# AirFitness BACK-END SERVER

## Introduction

This repository contains the back-end and all associated server files for the AirFitness application.

## Table of Contents

- [Data Schema](#data-schema-data-structures)
- [Summary Table of API Endpoints](#summary-table-of-api-endpoints)
- [User Routes](#user-routes)
  - [Register](#register)
  - [Login](#login)
  - [Get Users](#get-users)
  - [Get User](#get-user)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
- [Instructor Routes](#instructor-routes)
  - [Register](#register)
  - [Login](#login)
  - [Get Instructors](#get-instructors)
  - [Get Instructor](#get-instructor)
  - [Update Instructor](#update-instructor)
  - [Delete Instructor](#delete-instructor)

# DATA SCHEMA (DATA STRUCTURES)

`Users`

```
{
  "id": 1,                             // Integer (primary key provided by server and autoincrements)
  "username": "admin",                      // String, required
  "password": "password",                   // String, required
  "name": "admin",                    // String, required
  "email": "email@gmail.com"                // String, required
}
```

`Instructors`

```
{
  "workout_id": 1,                          // Integer (primary key provided by server and autoincrements)
  "workout_name": "Killing it",             // String, required
  "workout_date": 1552119140250,            // String, required (BigInt value is retrieved as string)
  "workout_type": "Weight Lifting",         // String
  "workout_subtype": "Squats",              // String
  "workout_sets": 5,                        // Integer
  "workout_reps": 8,                        // Integer
  "workout_time": 60,                       // Integer
  "workout_distance": 50,                   // Integer
  "workout_notes": "Awesome time.",         // String
  "body_region": "Legs",                    // String
  "max_weight": 200,                        // Integer
  "progress_picture": <url string>,         // String
  "user_id": 1                              // Integer, required (foreign key reference to "users" table)
}
```

`Classes`

```
{
  "workout_id": 1,                          // Integer (primary key provided by server and autoincrements)
  "workout_name": "Killing it",             // String, required
  "workout_date": 1552119140250,            // String, required (BigInt value is retrieved as string)
  "workout_type": "Weight Lifting",         // String
  "workout_subtype": "Squats",              // String
  "workout_sets": 5,                        // Integer
  "workout_reps": 8,                        // Integer
  "workout_time": 60,                       // Integer
  "workout_distance": 50,                   // Integer
  "workout_notes": "Awesome time.",         // String
  "body_region": "Legs",                    // String
  "max_weight": 200,                        // Integer
  "progress_picture": <url string>,         // String
  "user_id": 1                              // Integer, required (foreign key reference to "users" table)
}
```

_All workouts measurements are stored using the following measurements:_

```
  Date: Milliseconds
  Distance: Feet
  Weight: Pounds

```

# TEST USER ACCOUNTS

`Users`

```
  username: admin
  password: password

  username: mcfly
  password: password

  username: bigdoc
  password: password

```

# SUMMARY TABLE OF API ENDPOINTS

| Table    | Method | Endpoint                          | Description                                                                                                                                                                                    |
| -------- | ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auth     | POST   | /api/auth/register                | Creates a new `user` profile using the information sent inside the `body` of the request and returns a message along with the new `user` and a JSON Web Token in the `body` of the response.   |
| auth     | POST   | /api/auth/login                   | Uses the credentials sent inside the `body` to authenticate the user. On successful login, returns a message with the `user` profile and a JSON Web Token token in the `body` of the response. |
| users    | GET    | /api/restricted/users             | Retrieves an array of `user` objects and returns a message with the array in the `body` of the response.                                                                                       |
| users    | GET    | /api/restricted/users/:id         | Retrieves a single `user` object and returns a message with the object inside the `body` of the response.                                                                                      |
| users    | PUT    | /api/restricted/users/:id         | Updates a `user` in the database using the information sent inside the `body` of the request and returns a message with the updated `user` profile.                                            |
| users    | DELETE | /api/restricted/users/:id         | Removes a `user` from the database using the id sent in the URL parameters of the response.                                                                                                    |
| workouts | GET    | /api/restricted/workouts          | Retrieves an array of `workout` objects and returns a message with the array in the `body` of the response.                                                                                    |
| workouts | GET    | /api/restricted/workouts/:id      | Retrieves a single `workout` object using the id sent in the URL parameters of the request and returns a message with the object inside the `body` of the response.                            |
| workouts | GET    | /api/restricted/workouts/user/:id | Retrieves an array of `workout` objects for a single user using the id sent in the URL parameters of the request and returns a message with the array inside the `body` of the response.       |
| workouts | POST   | /api/restricted/workouts          | Uses the information sent inside the `body` to create a new `workout` for a specified user by included `user_id` and returns a message along with the new `workout`.                           |
| workouts | PUT    | /api/restricted/workouts/:id      | Uses the information sent inside the `body` to update a single `workout` using the id sent in the URL parameters of the request and returns a message along with the updated `workout`.        |
| workouts | DELETE | /api/restricted/workouts/:id      | Removes a `workout` in the database using the id sent in the URL parameters of the request.                                                                                                    |

# AUTH ROUTES

## **REGISTER**

### **Registers a user**

_Method Url:_ `/api/auth/register`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name              | type   | required | description    |
| ----------------- | ------ | -------- | -------------- |
| `username`        | String | Yes      | Must be unique |
| `password`        | String | Yes      |                |
| `first_name`      | String | Yes      |                |
| `last_name`       | String | Yes      |                |
| `email`           | String | Yes      | Must be unique |
| `profile_picture` | String | No       |                |

_example:_

```
{
  "username": "lauren",
  "password": "password123",
  "first_name": "admin",
  "last_name": "istrator",
  "email": "email@gmail.com"
  "profile_picture": <file>
}
```

#### Response

##### 200 (OK)

> If you successfully register a user the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your account was created successfully."
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI3IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xFXoX",
  "user": {
    "user_id": 1,
    "username": "admin",
    "first_name": "admin",
    "last_name": "istrator",
    "email": "email@gmail.com",
    "profile_picture": <cloudinary URL>,
    "created_at": "2019-03-09 08:26:34",
    "updated_at": "2019-03-09 08:26:34"
  }
}
```

##### 406 (Not Acceptable)

> If you are missing a username, password, first name, last name, or email for registration, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Please include required credentials and try again.."
}
```

##### 409 (Conflict)

> If the submitted username or email is a duplicate of what is already in the database, the endpoint will return an HTTP response with a status code `409` and a body as below.

```
{
  "error": true,
  "usernameError": <true/false depending on if username is duplicate>,
  "emailError": <true/false depending on if email is duplicate>,
  "message": "Sorry, that <username and/or email> already exists."
}
```

##### 404 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Your account could not be created in the database."
}
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "There was a problem with your request."
}
```

---

## **LOGIN**

### **Logs a user in**

_Method Url:_ `/api/auth/login`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description                                                           |
| ---------- | ------ | -------- | --------------------------------------------------------------------- |
| `username` | String | Yes      | Must match a username in the database                                 |
| `password` | String | Yes      | Must match a password in the database corresponding to above username |

_example:_

```
{
  "username": "mcfly",
  "password": "thatDeloreanTho"
}
```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "You were logged in successfully."
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MDwiaWF0IjoxNTQ0MzM1NjUxLCJleHAuOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXnE",
  "user": {
    "user_id": 1,
    "username": "nwthomas",
    "first_name": "nathan",
    "last_name": "thomas",
    "email": "nwthomas@me.com",
    "profile_picture": <cloudinary URL>,
    "created_at": "2019-03-09 08:26:34",
    "updated_at": "2019-03-09 08:26:34"
  }
}
```

##### 406 (Not Acceptable)

> If you are missing a username or password for login, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Please include a username and password and try again."
}
```

##### 404 (Not Found)

> If you send in an email address that does not match one in the database or the passwords do not match, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "The requested content does not exist."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "There was a problem with your request."
}
```

---

# USERS ROUTES

## **GET USERS**

### **Get all users**

_Method Url:_ `/api/restricted/users`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If users are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "The users were found in the database.",
  "users": [
    {
      "user_id": 1,
      "username": "admin",
      "first_name": "admin",
      "last_name": "istrator",
      "email": "email@gmail.com",
      "profile_picture": <cloudinary URL>,
      "created_at": "2019-03-11T04:18:42.916Z",
      "updated_at": "2019-03-11T04:18:42.916Z"
    },
    {
      "user_id": 2,
      "username": "mcfly",
      "first_name": "Marty",
      "last_name": "McFly",
      "email": "thelibyans@gmail.com",
      "profile_picture": <cloudinary URL>,
      "created_at": "2019-03-11T04:18:42.916Z",
      "updated_at": "2019-03-11T04:18:42.916Z"
    }
}
```

##### 404 (Not Found)

> If there are no users in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": [],
  "message": "The users could not be found in the database."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": [],
  "message": "There was a problem with your request."
}
```

---

## **GET USER**

### **Get user by user ID**

_Method Url:_ `/api/auth/register/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name      | type    | required | description           |
| --------- | ------- | -------- | --------------------- |
| `user_id` | Integer | Yes      | ID of a specific user |

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your profile was retrieved successfully."
  "user": {
    "user_id": 1,
    "username": "admin",
    "first_name": "admin",
    "last_name": "istrator",
    "email": "email@gmail.com",
    "profile_picture": <cloudinary URL>,
    "created_at": "2019-03-09 08:26:34",
    "updated_at": "2019-03-09 08:26:34"
  }
}
```

##### 404 (Bad Request)

> If the requested profile does not exist, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Your profile could not be found in the database."
}
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "There was an error processing your request."
}
```

---

## **UPDATE USER**

### **Update user by user ID**

_Method Url:_ `/api/auth/register/:id`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name      | type    | required | description           |
| --------- | ------- | -------- | --------------------- |
| `user_id` | Integer | Yes      | ID of a specific user |

#### Body

| name              | type   | required | description    |
| ----------------- | ------ | -------- | -------------- |
| `username`        | String | Yes      | Must be unique |
| `password`        | String | Yes      |                |
| `first_name`      | String | Yes      |                |
| `last_name`       | String | Yes      |                |
| `email`           | String | Yes      | Must be unique |
| `profile_picture` | String | No       |                |

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is updated successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your profile was updated successfully.",
  "numUpdated": 1,
  "user": {
    "user_id": 1,
    "username": "admin",
    "first_name": "admin",
    "last_name": "istrator",
    "email": "email@gmail.com",
    "profile_picture": <cloudinary URL>,
    "created_at": "2019-03-09 08:26:34",
    "updated_at": "2019-03-09 08:26:34"
  }
}
```

##### 406 (Not Acceptable)

> If the required data to update the user are not sent in the body, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Please include all required fields and try again.",
  "numUpdated": 0
}
```

##### 404 (Bad Request)

> If the profile cannot be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Your profile could not be updated.",
  "numUpdated": 0
}
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "There was an error processing your request.",
  "numUpdated": 0
}
```

---

## **DELETE USER**

### **Delete user by user ID**

_Method Url:_ `/api/auth/register/:id`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name      | type    | required | description           |
| --------- | ------- | -------- | --------------------- |
| `user_id` | Integer | Yes      | ID of a specific user |

#### Response

##### 200 (OK)

> If the user with the specified ID in the URL parameters is deleted successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your profile was deleted successfully.",
  "numDeleted": 1,
}
```

##### 404 (Bad Request)

> If the profile cannot be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "message": "Your profile could not be deleted.",
  "numDeleted": 0
}
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "message": "There was an error processing your request.",
  numDeleted: 0
}
```

---

# WORKOUTS ROUTES

## **GET WORKOUTS**

### **Get all workouts**

_Method Url:_ `/api/restricted/workouts`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If workouts are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "The workouts were retrieved successfully.",
  "workouts": [
      {
          "workout_id": 1,
          "workout_name": "Hoverboarding",
          "workout_date": "1552286585353",
          "workout_type": "Cardio",
          "workout_subtype": "Skateboarding",
          "workout_sets": null,
          "workout_reps": null,
          "workout_time": 60,
          "workout_distance": 500,
          "workout_notes": "Had to hoverboard away from some crazy futuristic bullies.",
          "body_region": "Legs",
          "max_weight": null,
          "progress_picture": null,
          "user_id": 2,
          "created_at": "2019-03-11T06:43:05.407Z",
          "updated_at": "2019-03-11T06:43:05.407Z"
      },
      {
          "workout_id": 2,
          "workout_name": "Time traveling like crazy",
          "workout_date": "1552286585353",
          "workout_type": "Cardio",
          "workout_subtype": "General Aerobics",
          "workout_sets": null,
          "workout_reps": null,
          "workout_time": 34,
          "workout_distance": 162,
          "workout_notes": "Roads? Where we're going we don't need roads....",
          "body_region": "Full Body",
          "max_weight": null,
          "progress_picture": null,
          "user_id": 3,
          "created_at": "2019-03-11T06:43:05.407Z",
          "updated_at": "2019-03-11T06:43:05.407Z"
      }
  ]
}
```

##### 404 (Not Found)

> If there are no workouts in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "workouts": [],
  "message": "The workouts could not be found."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "workouts": [],
  "message": "There was a problem with your request."
}
```

---

## **GET WORKOUT**

### **Get workout by workout ID**

_Method Url:_ `/api/restricted/workouts/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name         | type    | required | description              |
| ------------ | ------- | -------- | ------------------------ |
| `workout_id` | Integer | Yes      | ID of a specific workout |

#### Response

##### 200 (OK)

> If the workout is found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your workout was retrieved successfully.",
  "workout": {
      "workout_id": 1,
      "workout_name": "Hoverboarding",
      "workout_date": "1552286585353",
      "workout_type": "Cardio",
      "workout_subtype": "Skateboarding",
      "workout_sets": null,
      "workout_reps": null,
      "workout_time": 60,
      "workout_distance": 500,
      "workout_notes": "Had to hoverboard away from some crazy futuristic bullies.",
      "body_region": "Legs",
      "max_weight": null,
      "progress_picture": null,
      "user_id": 2,
      "created_at": "2019-03-11T06:43:05.407Z",
      "updated_at": "2019-03-11T06:43:05.407Z"
  }
}
```

##### 404 (Not Found)

> If the workout cannot be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "workout": {},
  "message": "Your workout could not be found."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "workouts": {},
  "message": "There was a problem with your request."
}
```

---

## **GET WORKOUTS BY USER**

### **Get workouts by user ID**

_Method Url:_ `/api/restricted/workouts/user/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name      | type    | required | description              |
| --------- | ------- | -------- | ------------------------ |
| `user_id` | Integer | Yes      | ID of a specific workout |

#### Response

##### 200 (OK)

> If the workout is found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "All of your workouts were retrieved successfully.",
  "workouts": [
      {
        "workout_id": 1,
        "workout_name": "Hoverboarding",
        "workout_date": "1552286585353",
        "workout_type": "Cardio",
        "workout_subtype": "Skateboarding",
        "workout_sets": null,
        "workout_reps": null,
        "workout_time": 60,
        "workout_distance": 500,
        "workout_notes": "Had to hoverboard away from some crazy futuristic bullies.",
        "body_region": "Legs",
        "max_weight": null,
        "progress_picture": null,
        "user_id": 2,
        "created_at": "2019-03-11T06:43:05.407Z",
        "updated_at": "2019-03-11T06:43:05.407Z"
      },
      {
        "workout_id": 5,
        "workout_name": "Helping Doc Brown out",
        "workout_date": "1552286585353",
        "workout_type": "Strength",
        "workout_subtype": "Squats",
        "workout_sets": 5,
        "workout_reps": 5,
        "workout_time": 51,
        "workout_distance": null,
        "workout_notes": "Wait a minute. Wait a minute Doc, uh, are you telling me you built a time machine … out of a DeLorean?",
        "body_region": "Legs",
        "max_weight": 215,
        "progress_picture": null,
        "user_id": 2,
        "created_at": "2019-03-11T06:43:05.407Z",
        "updated_at": "2019-03-11T06:43:05.407Z"
      }
  ]
}
```

##### 404 (Not Found)

> If no workouts for the specified user can be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "workouts": [],
  "message": "Your workouts could not be found."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "workouts": [],
  "message": "There was a problem with your request."
}
```

---

## **CREATE WORKOUT**

### **Create new workout for user**

_Method Url:_ `/api/restricted/workouts/`

_HTTP method:_ **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Body

| name               | type    | required | description                         |
| ------------------ | ------- | -------- | ----------------------------------- |
| `workout_name`     | String  | Yes      |                                     |
| `workout_date`     | Integer | Yes      | Created from Date.now()             |
| `workout_type`     | String  | No       |                                     |
| `workout_subtype`  | String  | No       |                                     |
| `workout_reps`     | Integer | No       |                                     |
| `workout_sets`     | Integer | No       |                                     |
| `workout_time`     | Integer | No       | Stored as minutes                   |
| `workout_distance` | Integer | No       | Stored as feet                      |
| `workout_notes`    | String  | No       |                                     |
| `body_region`      | String  | No       |                                     |
| `max_weight`       | Integer | No       | Stored as lbs                       |
| `progress_picture` | String  | No       |                                     |
| `user_id`          | Integer | Yes      | Foreign key reference to user table |

_example_

```
{
  "workout_name": "Hoverboarding",
  "workout_date": "1552286585353",
  "workout_type": "Cardio",
  "workout_subtype": "Skateboarding",
  "workout_sets": null,
  "workout_reps": null,
  "workout_time": 60,
  "workout_distance": 500,
  "workout_notes": "Had to hoverboard away from some crazy futuristic bullies.",
  "body_region": "Legs",
  "max_weight": null,
  "progress_picture": null,
  "user_id": 2,
}
```

#### Response

##### 200 (OK)

> If the workout is successfully created, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your workout was created successfully.",
  "workout": {
    "workout_id": 1,
    "workout_name": "Hoverboarding",
    "workout_date": "1552286585353",
    "workout_type": "Cardio",
    "workout_subtype": "Skateboarding",
    "workout_sets": null,
    "workout_reps": null,
    "workout_time": 60,
    "workout_distance": 500,
    "workout_notes": "Had to hoverboard away from some crazy futuristic bullies.",
    "body_region": "Legs",
    "max_weight": null,
    "progress_picture": null,
    "user_id": 2,
    "created_at": "2019-03-11T06:43:05.407Z",
    "updated_at": "2019-03-11T06:43:05.407Z"
  }
}
```

##### 406 (Not Acceptable)

> If the required data to create the workout is not sent in the body, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "workout": [],
  "message": "Please include required workout name and user ID details and try again."
}
```

##### 404 (Not Found)

> If no workouts for the specified user can be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "workout": [],
  "message": "Your workout could not be created."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "workout": [],
  "message": "There was a problem with your request."
}
```

---

## **UPDATE WORKOUT**

### **Update workout by workout ID**

_Method Url:_ `/api/restricted/workouts/:id`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Body

| name               | type    | required | description                         |
| ------------------ | ------- | -------- | ----------------------------------- |
| `workout_name`     | String  | Yes      |                                     |
| `workout_date`     | Integer | No       | Created from Date.now()             |
| `workout_type`     | String  | No       |                                     |
| `workout_subtype`  | String  | No       |                                     |
| `workout_reps`     | Integer | No       |                                     |
| `workout_sets`     | Integer | No       |                                     |
| `workout_time`     | Integer | No       | Stored as minutes                   |
| `workout_distance` | Integer | No       | Stored as feet                      |
| `workout_notes`    | String  | No       |                                     |
| `body_region`      | String  | No       |                                     |
| `max_weight`       | Integer | No       | Stored as lbs                       |
| `progress_picture` | String  | No       |                                     |
| `user_id`          | Integer | Yes      | Foreign key reference to user table |

_example_

```
{
  "workout_name": "Hoverboarding",
  "workout_date": "1552286585353",
  "workout_type": "Cardio",
  "workout_subtype": "Skateboarding",
  "workout_sets": null,
  "workout_reps": null,
  "workout_time": 60,
  "workout_distance": 500,
  "workout_notes": "Had to hoverboard away from some crazy futuristic bullies.",
  "body_region": "Legs",
  "max_weight": null,
  "progress_picture": null,
  "user_id": 2,
}
```

#### Response

##### 200 (OK)

> If the workout is successfully updated the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your workout was updated successfully.",
  "workout": {
    "workout_id": 1,
    "workout_name": "Hoverboarding",
    "workout_date": "1552286585353",
    "workout_type": "Cardio",
    "workout_subtype": "Skateboarding",
    "workout_sets": null,
    "workout_reps": null,
    "workout_time": 60,
    "workout_distance": 500,
    "workout_notes": "Had to hoverboard away from some crazy futuristic bullies.",
    "body_region": "Legs",
    "max_weight": null,
    "progress_picture": null,
    "user_id": 2,
    "created_at": "2019-03-11T06:43:05.407Z",
    "updated_at": "2019-03-11T06:43:05.407Z"
  },
  numUpdated: 1
}
```

##### 406 (Not Acceptable)

> If the required data to update the workout is not sent in the body, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "user": [],
  "message": "Please include required workout name and user ID details and try again.",
  "numUpdated": 0
}
```

##### 404 (Not Found)

> If no workout for the specified user can be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "workouts": [],
  "message": "Your workout could not be found to be updated.",
  "numUpdated": 0
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "workouts": [],
  "message": "There was a problem with your request.",
  "numUpdated": 0
}
```

---

## **DELETE WORKOUT**

### **Delete workout by workout ID**

_Method Url:_ `/api/restricted/workouts/:id`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name         | type    | required | description              |
| ------------ | ------- | -------- | ------------------------ |
| `workout_id` | Integer | Yes      | ID of a specific workout |

#### Response

##### 200 (OK)

> If the workout is found in the database and deleted, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your workout was deleted successfully.",
  "numDeleted": 1
}
```

##### 404 (Not Found)

> If no workouts for the specified user can be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "message": "Your workout could not be found to be deleted.",
  "numDeleted": 0
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request.",
  "numDeleted": 0
}
```

---