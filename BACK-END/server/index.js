var createError = require('http-errors');
const express = require("express");
var path = require('path');
const mongoose= require("mongoose");
var Player = require('../database/playerModel');
var Token= require('../database/token');
require("dotenv").config();
const app = express();

// CONFIRMATION EMAIL
var crypto = require('crypto');
var nodemailer = require('nodemailer');
//UPLODING IMAGE
const multerConfig = require('../multer')


const passport = require('passport');
const bodyParser = require('body-parser');

const imageModule = require ('../database/image')

const cloud = require("../cloudinary")
const fs = require("fs")

require("dotenv").config();


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
app.get('/register', function (req, res) {
    res.send('hello world')
  })
  

  app.post('/Register',  function(req,res,next){
    let newPlayer  = new Player({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      
    });    
  
  Player.addPlayer(newPlayer,(err)=>{
  if (err){
    console.log(err);
    res.json({success : false , msg :"failed to register player "});
  } else {
    res.json({success : true , msg :" player registered "});
  };
  
  });
})



//UPLODING IMAGE
//const imageModule = require ('../database/image');

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


//select the path for the static folder containing the images
app.use ('/images',express.static('images'))
// upload image
app.post('/myPics',multerConfig, async (req,res) => {
    // change the local storage to cloud storage
    const result = await cloud.uploads(req.files[0].path)
    const imageDetails = {
        imageName : req.files[0].originalname ,
        url : result.url
    }

 // save image in mongoDB
const image = new imageModule(imageDetails)
 image.save()
  
// delete image saved locally
    fs.unlinkSync(req.files[0].path)

////// putting the image to send it to cloundinary 
app.use (express.static('images'))
app.post('/myPics',multerConfig, (req,res) => {
    console.log(req.files)

    res.json({
        msg: "DONE",
        image: image
    })
})
})
// retrive images from databases
app.get('/myPics', async(req,res) => {
    const images = await imageModule.find()
    res.json(images)
})

// START SERVER 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`the server is running on port : ${PORT}`));

