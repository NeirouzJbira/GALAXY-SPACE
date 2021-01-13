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

app.use (express.static('images'))

app.post('/myPics',multerConfig, (req,res) => {
    console.log(req.files)
    res.json({
        msg: "DONE"
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`the server is running on port: ${PORT}`));

