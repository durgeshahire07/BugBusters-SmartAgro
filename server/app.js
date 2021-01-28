// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const auth = require('./api/routes/auth');

// connecting to database
mongoose.connect('mongodb+srv://jghadge:root123@cluster0.wg9gk.mongodb.net/samrtagro', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
    console.log("Database connected")
})

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/api/v1/auth/', auth)

module.exports = app;