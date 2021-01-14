var express = require('express');
var router = express.Router();
// var jwt = require('jsonwebtoken');
// var Player = require('../../database/playerModel');

// Register
router.get('/Register',  function(req,res,next){
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
// VALIDATE 
router.get('/Validate',  function(req,res,next){
  res.send('VALIDATE')
})

module.exports = router;