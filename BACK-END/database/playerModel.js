var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var player = new Schema({
    email : {type:String, require:true},
    username: {type:String, require:true ,unique: true },
    password:{type:String, require:true, minlength: 8},
    
});

module.exports = mongoose.model('player',player);