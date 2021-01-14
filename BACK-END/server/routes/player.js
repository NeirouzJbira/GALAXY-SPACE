var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var player = require('../../database/playerModel');

router.post('/register',  function(req,res,next){

    var Player = new player({
      email: req.body.email,
      username: req.body.username,
      password: Player.hashPassword(req.body.password),
      
    });
  
  let promise = user.save();

  promise.then(function(playerObject){
    return res.status(201).json(playerObject);
  });

  promise.catch(function(err){
    return res.status(501).json({message: 'Error registering user.'})
  });

})