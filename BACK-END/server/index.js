var createError = require('http-errors');
const express = require("express");
var path = require('path');
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();


// ADDING MONGOOSE
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (err) => {
    if (err) throw err;
    console.log("MONGO connected")
}
);

//UPLODING IMAGE
const multerConfig = require('../multer');
const imageModule = require ('../database/image');

// IMPORT IL DB (PLAYER MODEL)
const playerModel = require('../database/playerModel');

//REGISTER & LOGIN
const playersRouter = require('./routes/player');

// ADDING CORS 
var cors = require('cors');
app.use(cors({
    origin:'http://localhost:4000'
}));

// SET STATIC FOLDER 
app.use(express.static(path.join(__dirname, 'public')));


// ADDING BODY-PARSER middlware
app.use(bodyParser.json());
// PASSPORT middlware
app.use(passport.initialize());
app.use(passport.session());

require('../database/passport',passport)
app.use('/players', playersRouter);
// INDEX ROUTE
app.get("/",(req,res )=>{
    res.send("invalid endpoint")
    })


////// putting the image to send it to cloundinary 
app.use (express.static('images'))
app.post('/myPics',multerConfig, (req,res) => {
    console.log(req.files)
    res.json({
        msg: "DONE"
    })
})

// START SERVER 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`the server is running on port : ${PORT}`));


