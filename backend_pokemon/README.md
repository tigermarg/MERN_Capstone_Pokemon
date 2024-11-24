# MERN Application Using Pokemon API and Authentication (Back-end)

### About
This is the back-end for a full stack web application using the MERN (MongoDB, Express, React.js, Node.js) framework. (See below for link to front-end repo). The application's back-end is built with a RESTful API using Node and Express. It includes API routes for CRUD operations (Create, Read, Update and Delete). It allows users to create an account (POST), retrieve account information (GET), update information (PUT) and delete their account (DELETE). The application utilizes Mongoose to interface with the database (MongoDB) and includes authentication to access authorized routes.

### Technologies
Windows OS, VS Code

### How to Get Started
* Clone the repository
* Install Dependencies (see below): `npm install`
* npm start cmd: `npm start`
* Interact with the server through HTTP requests to retrieve data:

| Endpoint | Description |
| --- | --- 
| `localhost:3000` | Home URL |
| `localhost:3000/users` | Users data |
| `localhost:3000/auth` | Authenticated route |
| `localhost:3000/auth/id` | Authenticated route using id parameter |

### Built with:
* `node.js`: https://nodejs.org/en/download/package-manager
<br>-- JavaScript runtime environment
* `express`: https://expressjs.com/
<br>-- Node.js web application framework
* `mongodb`: https://www.mongodb.com/
<br>-- Document database
* `mongoose`: https://mongoosejs.com/
<br>-- Object Data Modeling (ODM) library for MongoDB and Node.js
* `nodemon`: https://www.npmjs.com/package/nodemon
<br>-- Tool for Node.js based applications
* `bcryptjs`: https://www.npmjs.com/package/bcryptjs
<br>-- Library for Password Hashing in Node.js
* `express-validator`: https://express-validator.github.io/docs/
<br>-- Validation middleware
* `jswonwebtoken`: https://www.npmjs.com/package/jsonwebtoken
<br>-- Encryption
* `cors`: Cross-origin resource sharing
<br>-- Mechanism for integrating applications
* `morgan`: https://expressjs.com/en/resources/middleware/morgan.html
<br>-- HTTP request logger middleware for Node.js

### Links:
* Front-end Repo:
<br> https://github.com/tigermarg/Frontend_MERN_Capstone_Pokemon.git
