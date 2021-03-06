var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  name: { 
	   type: String,
	   default: ''
  },
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  hash: String,
  salt: String,
  admin:{ 
     type: Boolean,
     default: false
  },
  status:{ 
	   type: Boolean,
	   default: false
  } 
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today.getTime() + (30 * 1 * 1000)); // set expiration to 1 hour for demomstration
  //var exp = new Date(today);
  //exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    name: this.name,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};



module.exports = mongoose.model('User', UserSchema);
