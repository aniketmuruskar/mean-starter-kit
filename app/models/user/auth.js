var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: { 
	type: String,
	default: ''
  },
  username: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String,
  status:{ 
	type: Boolean,
	default: false
  } 
});

mongoose.model('User', UserSchema);