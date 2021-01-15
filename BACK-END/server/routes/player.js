var express = require('express');
const router = require("express").Router();
var jwt = require('jsonwebtoken');
var Player = require('../../database/playerModel');
var Token= require('../../database/token');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport =require ('passport')

// Register
router.post('/Register',  function(req,res,next){
  let newPlayer  = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  let player ;
  let token ;
Player.addPlayer(newPlayer)
.then ((player)=>{ 
  player = player;
  console.log(player)
// Create a verification token for this player
 token = new Token({ _playerId: player._id, token: crypto.randomBytes(16).toString('hex') });
// Save the verification token
return token.save()
})
.then(()=> {
var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { Player: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
var mailOptions = { from: 'no-reply@yourwebapplication.com', to: newPlayer.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
// Send the email
 return transporter.sendMail(mailOptions)
}) 
.then(()=> res.status(200).send('A verification email has been sent to ' + Player.email + '.'))
.catch((err) => {
  console.log(err)
  return res.json({success : false , msg :"failed to register player "})
} );
})


// Authentificate
router.post('/Authentificate',  function(req,res,next){
  const username = req.body.username;
  const password = req.body.password;
  Player.getUserByUsername(username, (err, player) => {
    if (err) {
      return res.json({ success: false, msg: err });
    };
    if (!player) {
      return res.json({ success: false, msg: 'player not found' });
    }
  })
  Player.comparePassword(password, player.password, (err, isMatch) => {
    if (err) {
      return res.json({ success: false, msg: err });
    };
    // console.log('no err')
    if (isMatch) {
      const token = jwt.sign({data: player._id},"secretpleasedon'ttoutch");
      
      res.json({
        success: true,
        token: `Bearer ${token}`,
        player: {
          id: player._id,
          username: player.username,
          email: player.email
        }
      });
    } else {
      return res.json({ success: false, msg: 'Wrong password' });
    }
  });
})
//LOGIN
router.post('/login',  function(req,res){
  //
// Make sure the player has been verified
if (!Player.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 

// Login successful, write token, and send back user
res.send({ token: generateToken(Player), player: Player.toJSON() });
})

//CONFIRMATION 
router.get('/confirmation', function(req,res){
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
  //RESEND
  router.post('/resend',function(req,res){
    // Create a verification token, save it, and send email
    var token = new Token({ _playerId: Player._id, token: crypto.randomBytes(16).toString('hex') });
   
    // Save the token
    token.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
  
        // Send the email
        var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { player: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
        var mailOptions = { from: 'no-reply@codemoto.io', to: Player.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
        transporter.sendMail(mailOptions, function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            res.status(200).send('A verification email has been sent to ' + Player.email + '.');
        });
    });
  });
  
// PROFILE 
router.get('/Profile',passport.authenticate('bearer', {session : false})  ,function(req,res,next){
  res.json({
    player: {
      _id: req.player._id,
      username: req.player.username,
      email: req.player.email,
    }
  });
})


module.exports = router;
