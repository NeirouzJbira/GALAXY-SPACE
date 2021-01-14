const express = require("express");
const mongoose= require("mongoose");
const imageModule = require ('../database/image')
const multerConfig = require('../multer')
require("dotenv").config();

const app = express();


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

app.post('/myPics',multerConfig, (req,res) => {
    console.log(req.files[0])
    const imageDetails = {
        imageName : req.files[0].originalname ,
        url : req.files[0].path
    }

    // save image in mongoDB

    const image = new imageModule(imageDetails)
    image.save()
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
app.listen(PORT, () => console.log(`the server is running on port: ${PORT}`));

