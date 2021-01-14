var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var player = new Schema({
    _id: Number,
    email : {type:String, require:true},
    username: {type:String, require:true ,unique: true },
    password:{type:String, require:true, minlength: 8},
    isVerified: { type: Boolean, default: false }, 
    passwordResetToken: String,
    passwordResetExpires: Date
},);

 
player.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

player.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
} 

module.exports = mongoose.model('player',player);