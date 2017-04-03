const router = require('express').Router()

var Profile = require('../../models/profile/profile');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

// get all posts
router.get('/user', auth, function (req, res) {
    Profile
    	.findOne({ user: req.payload._id })
    	.populate('user', 'name')
    	.exec(function (err, profile) {
		  if (err)
            	return res.json({ result:0});

        	return res.json({result:1, user:profile});
		});
});

// get all posts
router.post('/update', auth, function (req, res) {
    
    var query = {'_id':req.body._id};

    Profile.findOneAndUpdate(query, req.body, {new:true}, function (err, profile) {
        if (err)
            res.json({result:0});

        return res.json({result:1, user:profile});
    });
});

module.exports = router
