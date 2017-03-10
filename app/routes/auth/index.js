const router = require('express').Router()

var passport = require('passport');
var User = require('../../models/user/auth');

router.post('/user/register', function(req, res, next){

	  if(!req.body.email || !req.body.password){
	    return res.status(400).json({message: 'Please fill out all fields'});
	  }

	  var user = new User();
	  user.name = req.body.name;
	  user.email = req.body.email;
	  user.setPassword(req.body.password)
	  user.admin = false;
	  user.status = true;
	  user.save(function (err){
	    	if(err){ return next(err);
	  	}
	    //return res.json({token: user.generateJWT()})
	    return res.json({result:1})
	  });
});

router.post('/authenticate', function(req, res, next){

	  if(!req.body.email || !req.body.password){
	    return res.status(400).json({message: 'Please fill out all fields'});
	  }

	  passport.authenticate('local', function(err, user, info){
	    if(err){ return next(err); }

	    if(user){
	      return res.json({token: user.generateJWT()});
	    } else {
	      return res.status(401).json(info);
	    }
	  })(req, res, next);
});

module.exports = router