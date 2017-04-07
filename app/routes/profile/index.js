const router = require('express').Router()

var Profile = require('../../models/profile/profile');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

// get all posts
router.get('/user', auth, function (req, res, next) {
    Profile
    	.findOne({ user: req.payload._id })
    	.populate('user', 'name')
    	.exec(function (err, profile) {
		  if(err) { return next(err); }
          return res.json({result:1, user:profile});
		});
});

// get all posts
router.post('/update', auth, function (req, res, next) {
    
    var query = {'_id':req.body._id};

    Profile.findOneAndUpdate(query, req.body, {new:true}, function (err, profile) {
        if(err) { return next(err); }
        return res.json({result:1, user:profile});
    });
});

router.use(function (err, req, res, next) {
  if (err.status === 401) {
    res.status(401).json({ result:0, statusMsg:'Invalid Token Expire'});
  } else if (err.status === 400) {
    res.status(400).json({ result:0, statusMsg:'Bad request'});
  } else {
    res.status(403).json({ result:0, statusMsg:'Forbidden request'});
  }
});

module.exports = router
