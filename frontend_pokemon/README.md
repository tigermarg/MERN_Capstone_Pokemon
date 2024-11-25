# MERN Application Using Pokemon API and Authentication (Front-end)

### About
This is the front-end for a full stack web application using the MERN (MongoDB, Express, React.js, Node.js) framework. The application's front-end is built with React to navigate to different pages. It utilizes React Hooks for application state management and interfaces directly with the server and API using MongoDB and Mongoose. The application connects to the Pokemon API to retrieve data using fetch. It also uses validation and authentication for user data.

### Technologies
Windows OS, VS Code

### How to Get Started
* Clone the repository
* Install Dependencies (see below): `npm install`
* npm run cmd: `npm run dev`
* Sign Up to explore full capabilities of the application.

| Endpoint | Description | 
| --- | --- |
| `/` | Home URL > Click Pokéball to start
| `/login` | Login page > Enter valid credentials to access Dashboard
| `/signup` | Sign Up page > Create account using required fields
| `/dashboard` | Dashboard page (authenticated users) > Navigate to links once authenticated
| `/survey` | Survey page (authenticated users) > Access to Survey to GET Pokémon
| `/pokeball` | Pokéball page (authenticated users) > Access Pokéball to see retrieved Pokémon
| `/account` | Account page (authenticated users) > Access Account page to update & delete account

### Built with:
* React + Vite: 
<br>`npm create vite@latest .`
* React Router:
<br>`npm i react-router-dom`
* Universal cookies for React:
<br>`react-cookie`
* Pokemon API: https://pokeapi.co/
<br>-- Retrieve Pokemon information.

