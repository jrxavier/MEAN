var express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');


module.exports = function() {

	var app = express();

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev')); //logger middleware
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress()); //response compression
	}

	//body parser: module that provides several middleware to handle request data
	app.use(bodyParser.urlencoded ({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride()); //provider DELETE and PUT http verbs legacy support

	require('../app/routes/index.server.routers')
	(app);

	return app;
};