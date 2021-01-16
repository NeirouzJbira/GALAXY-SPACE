var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var player = new mongoose.Schema({
    email : {type:String, require:true},
    username: {type:String, require:true ,unique: true },
    password:{type:String, require:true, minlength: 8},
    isVerified:{type:Boolean,default: false},
    passwordResetToken: String
    
});

const Player = module.exports = mongoose.model('Player',player);

module.exports.getUserById = function (Id, callabck){
    Player.findById(Id, callabck);
};

module.exports.getUserByUsername = function (username){
    const query ={username : username}
   return Player.findOne(query).exec();
};

module.exports.addPlayer = function (newPlayer){
    return bcrypt.genSalt(10)
    .then((salt)=>  bcrypt.hash(newPlayer.password,salt ))
    .then((hash)=>{ 
        newPlayer.password = hash
       return Player.create(newPlayer) 
    })
}; 

module.exports.comparePassword = function(playerPassword, hash){
   return bcrypt.compare(playerPassword, hash)
};