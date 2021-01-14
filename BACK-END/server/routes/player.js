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

Player.addPlayer(newPlayer,(err)=>{
if (err){
  console.log(err);
  res.json({success : false , msg :"failed to register player "});
} else {
  res.json({success : true , msg :" player registered "});
};

});
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
  });
})
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