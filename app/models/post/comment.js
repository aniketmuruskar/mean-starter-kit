var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
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