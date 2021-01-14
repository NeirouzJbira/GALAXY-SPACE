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
        bcrypt.hash(newPlayer.password, salt , (err,hashPassword)=>{
            if (err) throw err ;
            newPlayer.password = hashPassword; 
            newPlayer.save(callback)
        })
    });
}