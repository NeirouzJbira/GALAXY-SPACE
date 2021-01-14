var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Player Schema
var PlayerSchema = mongoose.Schema({
    username: {type:String, require:true ,unique: true },
    email : {type:String, require:true},
    password:{type:String, require:true, minlength: 8},
})

const Player = module.exports = mongoose.model('Player',PlayerSchema);