// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
require('dotenv').config();
require('./api/utils/initDB');

// const vars
const auth = require('./api/routes/auth');
const port = process.env.PORT || 5000;

// using middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// routings
app.use('/api/v1/auth/', auth)

// initializing server and listening to requests
app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log('unable to start server!');
    } else {
        console.log(`Server started at port ${port}\nBrowse at http://localhost:${port}/api/v1/`);
    }
});
