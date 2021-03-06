// set up ======================================================================
var express = require('express');
var app = express(); 				// create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var port = 8886; // set the port
var database = require('./config/database'); // load the database config

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================
mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users

require('./app/models/user/auth');  	// load the passport for authrntication with user model
var passport = require('./config/passport');
app.use(passport.initialize());

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// application =====================================================================


// app routes ======================================================================
app.use('/api', require('./app/routes'))
app.all('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(port);

console.log("App listening on port " + port);
