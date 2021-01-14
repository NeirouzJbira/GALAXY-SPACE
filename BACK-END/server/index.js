var createError = require('http-errors');
const express = require("express");
var path = require('path');
const mongoose= require("mongoose");

const imageModule = require ('../database/image')
const multerConfig = require('../multer')
const cloud = require("../cloudinary")
const fs = require("fs")

require("dotenv").config();
const app = express();

//UPLODING IMAGE
const multerConfig = require('../multer')
const imageModule = require ('../database/image')

//REGISTER & LOGIN
const playersRouter = require('./routes/player');


// ADDING CORS 
var cors = require('cors');
app.use(cors({
      origin:'http://localhost:4000'
}));
    
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


// retrive images from databases

app.get('/myPics', async(req,res) => {
    const images = await imageModule.find()
    res.json(images)
})





const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`the server is running on port : ${PORT}`));


