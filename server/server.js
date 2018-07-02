//server/server.js

var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
// mongoose.connect('mongodb://vietlinhco:Ankedalinhco1@ds001.mlab.com:001/db101');
// mongoose.connect('mongodb://vietlinhco:Ankedalinhco1@ds125469.mlab.com:25469/expenses');
let options = {
	db: {native_parser: true},
	server: {poolSize: 5},
	// user:
	// pass: 	
};
mongoose.Promise = global.Promise;
// 'mongodb://localhost:27017/myDatabase'
// 'mongodb://vietlinhco:Ankedalinhco1@ds125469.mlab.com:25469/expenses'
mongoose.connect('mongodb://vietlinhco:Ankedalinhco1@ds125469.mlab.com:25469/expenses', options).then(
	() => {
		console.log("connect DB successfully")
	},
	err => {
		console.log("Connection failed. Error: ${err}")
	}
)

// mongoose.connect('mongodb://vietlinh:123456@ds001.mlab.com:001/db101');
app.use('/', router);
module.exports=app;