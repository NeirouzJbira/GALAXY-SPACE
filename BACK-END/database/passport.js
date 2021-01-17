const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const Player = require('./playerModel');

module.exports = function (passport){
let opts ={}; 
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  // console.log(jwt_payload);
    Player.getUserById(jwt_payload.data, (err, player) => {
      
      if(err){
        return done(err, false);
      }
      if(player){
        return done(null, player);
      } else {
        return done(null, false);
      }
    });
  }));
}