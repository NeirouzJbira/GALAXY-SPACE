var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var player =require ('./playerModel')

//create a verification token
const tokenSchema = new Schema({
    _playerId: { type: Schema.Types.ObjectId, required: true, ref: 'player' },
    token: { type: String, required: true }
});
module.exports = mongoose.model('tokenSchema',tokenSchema);