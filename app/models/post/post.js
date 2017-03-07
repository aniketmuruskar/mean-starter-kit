var mongoose = require('mongoose');

module.exports = mongoose.model('Post', {
    title: { 
    	type: String,
    	default: ''
    },
    author: String,
    description: { 
      type: String, 
      default: ''
    },
  	date:{ 
  		type: Date,
  		default: Date.now 
  	},
  	status: Boolean
});