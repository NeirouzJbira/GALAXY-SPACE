const JwtStrategy = require('passport-jwt').Strategy,
 ExtractJwt = require('passport-jwt').ExtractJwt;
const Player = require('./playerModel');

module.exports = function (passport){
let opts ={}; 
opts.jwtFormRequest = ExtractJwt.fromAuthHeader();
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  // console.log(jwt_payload)
    Player.getUserById(jwt_payload.data._id, (err, user) => {
      
      if(err){
        return done(err, false);
      }

      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}