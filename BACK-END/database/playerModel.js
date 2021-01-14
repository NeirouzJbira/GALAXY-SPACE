var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var player = new Schema({
    email : {type:String, require:true},
    username: {type:String, require:true ,unique: true },
    password:{type:String, require:true, minlength: 8},
    
});

player.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

player.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
} 

module.exports = mongoose.model('player',player);