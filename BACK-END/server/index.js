var createError = require('http-errors');
const express = require("express");
var path = require('path');
const mongoose= require("mongoose");
var player = require('../database/playerModel');
var Token= require('../database/token');
require("dotenv").config();
const app = express();

// CONFIRMATION EMAIL
var crypto = require('crypto');
var nodemailer = require('nodemailer');
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
app.get('/register', function (req, res) {
    res.send('hello world')
  })
  
app.post('/register',  function(req,res,next){

    var Player = new player({
      email: req.body.email,
      username: req.body.username,
      password: Player.hashPassword(req.body.password),
       });
  

/*// Create a verification token for this player
var token = new Token({ _playerId: player._id, token: crypto.randomBytes(16).toString('hex') });
 
// Save the verification token
token.save(function (err) {
    if (err) { return res.status(500).send({ msg: err.message }); }

// Send the email
var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { player: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
var mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
transporter.sendMail(mailOptions, function (err) {
  if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).send('A verification email has been sent to ' + player.email + '.');
      })
})*/
})

/*app.post('/login',  function(req,res){
// Make sure the player has been verified
if (!player.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 

// Login successful, write token, and send back user
res.send({ token: generateToken(player), player: player.toJSON() });
})
app.get('/confirmation', function(req,res){
    // Find a matching token
      Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
    
    // If we found a token, find a matching player
        player.findOne({ _id: token._playerId, email: req.body.email }, function (err, player) {
            if (!player) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
     // Verify and save the user
           player.isVerified = true;
            player.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
    });
   app.post('/resend',function(req,res){
      // Create a verification token, save it, and send email
      var token = new Token({ _playerId: player._id, token: crypto.randomBytes(16).toString('hex') });
     
      // Save the token
      token.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
    
          // Send the email
          var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { player: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
          var mailOptions = { from: 'no-reply@codemoto.io', to: player.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
          transporter.sendMail(mailOptions, function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              res.status(200).send('A verification email has been sent to ' + player.email + '.');
          });
      });
    });
    */
////// putting the image to send it to cloundinary 
app.use (express.static('images'))
app.post('/myPics',multerConfig, (req,res) => {
    console.log(req.files)
    res.json({
        msg: "DONE"
    })
})




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`the server is running on port : ${PORT}`));


