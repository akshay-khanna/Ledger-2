var express = require('express');
var path = require('path');
var utils = require('./utils.js');
var app = express();

// DataBase - NOT USED ATM
/*
var mysql = require('mysql');
var con = mysql.createConnection({
	host: 'freedb.tech',
	user: 'freedbtech_ledgerApp',
	password: 'ledger123',
	database: 'freedbtech_ledger',
	port: 3306,
});
con.connect(function (err) {
	if (err) {
		console.log('Error connecting to Db', err);
		return;
	}
	console.log('Connection established');
	// con.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');
});
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './views')));

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, './views/form.html'));
});

app.post('/tenant_info', function (req, res) {
	if (req.body.frequency === 'weekly') {
		let tenant_info = utils.weeklyPayment(req.body);
		res.send('WEEKLY PAYMENT SCHED:: ' + JSON.stringify(tenant_info));
	} else if (req.body.frequency === 'fortnightly') {
		let tenant_info = utils.fortnightPayment(req.body);
		res.send('FORNIGHT PAYMENT SCHED:: ' + JSON.stringify(tenant_info));
	} else if (req.body.frequency === 'monthly') {
		let tenant_info = utils.monthlyPayment(req.body);
		res.send('MONTHLY PAYMENT SCHED:: ' + JSON.stringify(tenant_info));
		// res.sendFile(path.join(__dirname, './table.html'), { data: tenant_info });
		// res.send(JSON.stringify(tenant_info) + result);
	}
});

app.get('/tenant_info', (req, res, next) => {
	res.render(path.join(__dirname, './views/table.html'), { data: tenant_info });
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
