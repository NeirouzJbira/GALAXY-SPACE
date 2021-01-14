const express = require('express');
const router = express.Router();
const passport = require ('passport')
const jwt = require('jsonwebtoken');
const Player = require('../../database/playerModel');

// Register
router.post('/Register',  function(req,res,next){
  let newPlayer  = new Player({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    
  });     
Player.addPlayer(newPlayer,(err , player)=>{
if (err){
  res.json({success : false , msg :"failed to register player "})
} else {
  res.json({success : true , msg :" player registered "})
}

})
})

// Authentificate
router.post('/Authentificate',  function(req,res,next){
  res.send('AUTHENTICATE')
})
// PROFILE 
router.get('/Profile',  function(req,res,next){
  res.send('PROFILE')
})


module.exports = router;