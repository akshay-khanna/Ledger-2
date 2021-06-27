var express = require('express');
var http = require('http');
var util = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var utils = require('./utils.js');

var app = express();

// DataBase
var mysql = require('mysql');
var con = mysql.createConnection({
	host: 'freedb.tech',
	user: 'freedbtech_ledgerApp',
	password: 'ledger123',
	database: 'freedbtech_ledger',
	port: 3306,
});

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './')));

con.connect(function (err) {
	if (err) {
		console.log('Error connecting to Db', err);
		return;
	}
	console.log('Connection established');
	// con.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');
});

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, './form.html'));
});

app.post('/tenant_info', function (req, res) {
	// 	db.serialize(()=>{
	// 	  db.run('INSERT INTO emp(id,name) VALUES(?,?)', [req.body.id, req.body.name], function(err) {
	// 		if (err) {
	// 		  return console.log(err.message);
	// 		}
	// 		console.log("New employee has been added");
	// 		res.send("New employee has been added into the database with ID = "+req.body.id+ " and Name = "+req.body.name);
	// 	  });
	//   });

	// let final_info = 'TENANT LEDGER start date ' + req.body.start_date + '  and end_date = ' + req.body.end_date + '  --paid-- ' + req.body.frequency + '  --paying rent::' + req.body.weekly_rent;

	if (req.body.frequency === 'weekly') {
		let tenant_info = utils.weeklyPayment(req.body);
		res.send('WEEKLY PAYMENT SCHED:: ' + JSON.stringify(tenant_info));
	} else if (req.body.frequency === 'fortnightly') {
		let tenant_info = utils.fortnightPayment(req.body);
		res.send('FORNIGHT PAYMENT SCHED:: ' + JSON.stringify(tenant_info));
	} else if (req.body.frequency === 'monthly') {
		let tenant_info = utils.monthlyPayment(req.body);
		res.send('MONTHLY PAYMENT SCHED:: ' + JSON.stringify(tenant_info));
	}
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});

// That is how you calculate the length of a week. 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds.
