const router = require('express').Router()

var Profile = require('../../models/profile/profile');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

// get all posts
router.get('/user', auth, function (req, res) {
    
    Profile.findOne({
        user: req.payload._id
    }, function (err, profile) {
        if (err)
            res.send(err);

        return res.json({result:1, user:profile});
    });
});

module.exports = router