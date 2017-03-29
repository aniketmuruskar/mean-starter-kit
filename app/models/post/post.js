var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
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
    total_comments: {type: Number, default: 0},
    upvotes: {type: Number, default: 0},
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    status: Boolean
});

module.exports = mongoose.model('Post', PostSchema);
