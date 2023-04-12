const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const databaseConfig = require("./config/key");
const {mongoose} = require("mongoose");
const userRoute = require('./routes/user-route');
const authRoute = require('./routes/auth-route');
const cors = require("cors");



const app = express();

// To prevent CORS errors
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Connecting mongoDB
console.log(databaseConfig);
mongoose.connect(databaseConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Checking the connection to db
const db = mongoose.connection;
db.once("open", () => console.log("Mongo Database is connected now!"));
db.on("error", console.error.bind(console, "Connection error:"));


// Auth Routes
app.use("/v1", authRoute);
// User Routes
app.use("/v1", userRoute);


// Handle errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({message: "An error occured"});
})

module.exports = app;
