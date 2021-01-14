var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Player Schema
var PlayerSchema = mongoose.Schema({
    username: {type:String, require:true ,unique: true },
    email : {type:String, require:true},
    password:{type:String, require:true, minlength: 8},
})

const Player = module.exports = mongoose.model('Player',PlayerSchema);

module.exports.getUserById = function (Id, callabck){
    Player.findById(Id, callabck);
};

module.exports.getUserByUsername = function (username, callabck){
    const query ={username : username}
    Player.findOne(query, callabck);
};
module.exports.addPlayer = function (newPlayer, callback){
    bcrypt.genSalt(10 , (err , salt )=>{
        bcrypt.hash(newPlayer.password, salt , (err,hash)=>{
            if (err) throw err ;
            newPlayer.password = hash; 
            newPlayer.save(callback)
        })
    });
}; 
module.exports.comparePassword = function(playerPassword, hash, callback){
    bcrypt.compare(playerPassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
};