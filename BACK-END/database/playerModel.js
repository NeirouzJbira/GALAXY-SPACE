var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var player = new mongoose.Schema({
    email : {type:String, require:true},
    username: {type:String, require:true ,unique: true },
    imageName : {type: String,required: true},
    imageUrl : {type: String,required: true},
    password:{type:String, require:true, minlength: 8},
    passwordResetToken: String
    
});

const Player = module.exports = mongoose.model('Player',player);

module.exports.getUserById = function (Id, callabck){
    Player.findById(Id, callabck);
};

module.exports.getUserByUsername = function (username, callabck){
    const query ={username : username}
    Player.findOne(query, callabck);
};

module.exports.addPlayer = function (newPlayer){
    return bcrypt.genSalt(10)
    .then((salt)=>  bcrypt.hash(newPlayer.password,salt ))
    .then((hash)=>{ 
        newPlayer.password = hash
       return Player.create(newPlayer) 
    })
}; 
module.exports.comparePassword = function(playerPassword, hash, callback){
    bcrypt.compare(playerPassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
};