  
var createError = require('http-errors');
const express = require("express");
var path = require('path');
const mongoose= require("mongoose");
require("dotenv").config();


const imageModule = require ('../database/image')
const playersRouter = require('./routes/player');

const app = express();

// add mongoose 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ricker');

// add cors 
var cors = require('cors');
app.use(cors({
  origin:'http://localhost:4200'
}));



// mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// }, (err) => {
//     if (err) throw err;
//     console.log("MONGO connected")
// }
// );

// app.use (express.static('images'))

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`the server is running on port: ${PORT}`));

