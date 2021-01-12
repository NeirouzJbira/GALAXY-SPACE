var createError = require('http-errors');
const express = require("express");
var path = require('path');
const mongoose= require("mongoose");
require("dotenv").config();
const app = express();

//UPLODING IMAGE
const multerConfig = require('../multer')

//REGISTER & LOGIN
const imageModule = require ('../database/image')
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
//////
app.use (express.static('images'))
app.post('/myPics',multerConfig, (req,res) => {
    console.log(req.files)
    res.json({
        msg: "DONE"
    })
})




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`the server is running on port : ${PORT}`));


