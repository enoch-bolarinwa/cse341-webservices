// Load environment variables from .env file
require('dotenv').config();

// Now you can access environment variables anywhere in your code
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;

console.log(`Connecting to database at ${dbHost} with user ${dbUser}`);

// Your other application code follows
// For example, setting up your server, routes, etc.


const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use('/', require('./routes'))


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else{app.listen(port, () => {console.log(`database is listening and node Running on port ${port}`)});
}
});