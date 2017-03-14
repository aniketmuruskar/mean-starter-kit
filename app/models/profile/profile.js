var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
    organization: { 
      type: String,
      default: '',
      maxlength: 50
    },
    city: { 
      type: String,
      default: '',
      maxlength: 20
    },
    state: { 
      type: String,
      default: '',
      maxlength: 20
    },
    country: { 
      type: String,
      default: '',
      maxlength: 20
    },
    mobile: { 
      type: String, 
      default: '',
      maxlength: 15
    },
    website: { 
      type: String, 
      default: ''
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    },
    status: {
      type: Boolean,
      default: true
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);