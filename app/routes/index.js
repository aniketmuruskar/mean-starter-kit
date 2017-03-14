const router = require('express').Router();

router.get('/', function (req, res) {
  	app.get('*', function (req, res) {
    	res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
});

router.use('/api/posts', require('./post'));
router.use('/api', require('./auth'));
router.use('/api/profile', require('./profile'));

module.exports = router;