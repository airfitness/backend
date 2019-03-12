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
- [Classes Routes](#classes-routes)
  - [Get Classes](#get-classes)
  - [Get Class](#get-class)
  - [Update Class](#update-class)
  - [Delete Class](#delete-class)
  - [Add Class type](#post-type)
  - [Create punch card](#post-punch)

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
  "id": 1,                             // Integer (primary key provided by server and autoincrements)
  "username": "guy",                      // String, required
  "password": "password",                   // String, required
  "name": "An instructor",                    // String, required
  "bio": "A bio for instructor"             //string, required
  "email": "email@gmail.com"                // String, required
}
```

`Classes`

```
{
  "id": 1,                             // Integer (primary key provided by server and autoincrements)
  "class_name": "A class",              // string, requrired
  "instructorId": 1,                    // integer, foreign_key for 'id' in 'instructors' table
  "times": "Sometime",                  // string, required
  "price": 100.29,                      // float, required
  "location": "somewhere",              // string, required
}
```

`Punch Cards`

```
{
  "id": 1,                             // Integer (primary key provided by server and autoincrements)
  "classId": 1,                    // integer, foreign_key for 'id' in 'classes' table
  "userId": 1,                    // integer, foreign_key for 'id' in 'users' table
  "transactionId": 1,                    // integer, foreign_key for 'id' in 'transactions' table
  "puches_available": 10,                  // integer, required, defaults to 10
}
```

`Transactions`

```
{
  "id": 1,                             // Integer (primary key provided by server and autoincrements)
  "classId": 1,                    // integer, foreign_key for 'id' in 'classes' table
  "userId": 1,                    // integer, foreign_key for 'id' in 'users' table
  "instructorId": 1,                    // integer, foreign_key for 'id' in 'instructors' table
  "price": 100.29,                      // float, required
}
```

# SUMMARY TABLE OF API ENDPOINTS

| Table    | Method | Endpoint                          | Description                                                                                                                                                                                    |
| -------- | ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| users     | POST   | /api/users/register                | Creates a new `user` profile using the information sent inside the `body` of the request and returns a message |
| users     | POST   | /api/users/login                   | Uses the credentials sent inside the `body` to authenticate the user. On successful login, returns a message with the `user` profile and a JSON Web Token token in the `body` of the response.|
| users    | PUT    | /api/users/:id         | Updates a `user` in the database using the information sent inside the `body` of the request and returns a message with the updated `user` profile.                                            |
| users    | DELETE | /api/users/:id         | Removes a `user` from the database using the id sent in the URL parameters of the response.                                                                                                    |
| instructors | GET    | /api/instructors/:id        | Retrieves an array of `instructor` objects and returns a message with the array in the `body` of the response.                                                                                    |
| instructors     | POST   | /api/instructors/register                | Creates a new `instructor` profile using the information sent inside the `body` of the request and returns a message along with the new `instructor` |
| instructors     | POST   | /api/instructors/login                   | Uses the credentials sent inside the `body` to authenticate the instructor. On successful login, returns a message with the `instructor` profile and a JSON Web Token token in the `body` of the response.|
| instructors    | PUT    | /api/instructors/:id         | Updates a `instructor` in the database using the information sent inside the `body` of the request and returns a message with the updated `instructor` profile.                                            |
| instructors    | DELETE | /api/instructors/:id         | Removes a `instructor` from the database using the id sent in the URL parameters of the response.                                                                                                    |
| classes | GET    | /api/classes        | Retrieves an array of `classes` objects and returns a message with the array in the `body` of the response.                                                                                    |
| classes | GET    | /api/classes/:id      | Retrieves a single `classes` object using the id sent in the URL parameters of the request and returns a message with the object inside the `body` of the response.                            |
| classes | POST    | /api/classes |  Uses the information sent inside the `body` to create a new `class` for a specified instructor by included `instructorId` and returns a message along with the new `class`.                           |
| classes/punchCards/transactions | POST   | /api/classes/:id/punch          | Uses the information sent inside the `body` and classId of /:id to create a new `punchCard` and `transaction` for a specified user by included `userId` and returns a message along with the new id of `punchCard`.                           |
| classes | PUT    | /api/classes/:id      | Uses the information sent inside the `body` to update a single `class` using the id sent in the URL parameters of the request and returns a message along with the updated `class`.        |
| classes | DELETE | /api/classes/:id      | Removes a `class` in the database using the id sent in the URL parameters of the request.                                                                                                    |

# AUTH ROUTES

## **REGISTER**

### **Registers a user**

_Method Url:_ `/api/user/register`

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
| `name`      | String | Yes      |                |
| `email`           | String | Yes      | Must be unique |

_example:_

```
{
  "username": "lauren",
  "password": "password123",
  "name": "gary",
  "email": "email@gmail.com"
}
```

#### Response

##### 200 (OK)

> If you successfully register a user the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "userId": 1,
    "username": "harold",
    "name": "remis",
    "email": "email@gmail.com",
}
```

##### 406 (Not Acceptable)

> If you are missing a username, password, first name, last name, or email for registration, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
    "error": "Please provide username, full name, email and password"
}
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": "Could not register user."
}
```

---

## **LOGIN**

### **Logs a user in**

_Method Url:_ `/api/users/login`

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
  "username": "gordo",
  "password": "myNameIsSting"
}
```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MDwiaWF0IjoxNTQ0MzM1NjUxLCJleHAuOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXnE",
    "id": 1,
    "username": "gordo",
    "name": "sting",
    "email": "gordo@sting.com"
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": "Could not log in user"
}
```

---

# INSTRUCTOR ROUTES

## **GET INSTRUCTORS**

### **Get all users**

_Method Url:_ `/api/instructors`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |

#### Response

##### 200 (OK)

> If users are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "instructors": [
    {
      "id": 1,
      "username": "me",
      "name": "mario",
      "email": "email@gmail.com",
      "bio": "He's a pretty big deal"
    },
    {
      "id": 2,
      "username": "luigi",
      "name": "luigi",
      "email": "email@luigi.com",
      "bio": "No one likes him"
    }
}
```


---

## **GET Instructor**

### **Get instructor by instructor ID**

_Method Url:_ `/api/instructors/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |

#### Parameters

| name      | type    | required | description           |
| --------- | ------- | -------- | --------------------- |
| `id` | Integer | Yes      | ID of a specific instructor |

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "username": "new",
    "name": "A new user",
    "email": "anotherfake@fakeemail.com",
    "bio": "A bio",
    "classes": [
        {
            "id": 1,
            "class_name": "Another new class",
            "instructorId": 1,
            "times": "Sometime",
            "price": 100.29,
            "location": "somewhere",
            "createdAt": "2019-03-12 17:01:47"
        }
    ]
}
```

---

---

# CLASSES ROUTES

## **GET CLASSES**

### **Get all classes**

_Method Url:_ `/api/classes`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |

#### Response

##### 200 (OK)

> If classes are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "classes": [
        {
            "id": 1,
            "class_name": "Another new class",
            "instructorId": 1,
            "times": "Sometime",
            "price": 100.29,
            "location": "somewhere",
            "createdAt": "2019-03-12 17:01:47",
            "types": [
                {
                    "id": 1,
                    "type": "other",
                    "classId": 1
                },
                {
                    "id": 2,
                    "type": "cardio",
                    "classId": 1
                },
                {
                    "id": 3,
                    "type": "dance",
                    "classId": 1
                }
            ]
        },
        {
            "id": 2,
            "class_name": "Some other kind of class",
            "instructorId": 1,
            "times": "Around noon",
            "price": 100.29,
            "location": "kansas",
            "createdAt": "2019-03-12 17:29:07",
            "types": []
        }
    ]
}
```

---

## **GET Class**

### **Get class by class ID**

_Method Url:_ `/api/classes/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |

#### Parameters

| name         | type    | required | description              |
| ------------ | ------- | -------- | ------------------------ |
| `id` | Integer | Yes      | ID of a specific workout |

#### Response

##### 200 (OK)

> If the class is found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "id": 1,
    "class_name": "Another new class",
    "instructorId": 1,
    "times": "Sometime",
    "price": 100.29,
    "location": "somewhere",
    "instructorName": "A new user",
    "instructorUsername": "new",
    "types": [
        {
            "id": 1,
            "type": "other",
            "classId": 1
        },
        {
            "id": 2,
            "type": "cardio",
            "classId": 1
        },
        {
            "id": 3,
            "type": "dance",
            "classId": 1
        }
    ]
}
```

---

## **CREATE PUNCHCARD**

### **Create new punch card for user**

_Method Url:_ `/api/classes/:id`

_HTTP method:_ **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Body

| name               | type    | required | description                         |
| ------------------ | ------- | -------- | ----------------------------------- |
| `userId`     | Integer  | Yes      | Id of user purchasing card               |
| `instructorId`     | Integer | Yes      | instructorId of class               |
| `price`     | Float  | yes      |           total price for card              |


_example_

```
{
	"userId": 1,
	"instructorId": 1,
	"price": 75.29
}
```

#### Response

##### 200 (OK)

> If the punch card is successfully created, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "message": "Punch card added!",
    "id": 1
}
```

---

## **UPDATE CLASS**

### **Update class by class ID**

_Method Url:_ `/api/classes/:id`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |
