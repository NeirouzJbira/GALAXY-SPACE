var express = require('express');
var router = express.Router();
// var jwt = require('jsonwebtoken');
// var Player = require('../../database/playerModel');

// Register
router.post('/Register',  function(req,res,next){
   res.send('register')
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