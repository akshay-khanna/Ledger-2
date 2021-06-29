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
var data = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.get('/', (req, res, next) => {
	res.render(path.join(__dirname, './views/form.html'));
});
app.get('/tenant_info', function (req, res) {
	query={
		frequency: req.query.frequency,
		start_date:req.query.start_date,
		end_date: req.query.end_date,
		weekly_rent: req.query.weekly_rent,
		time_zone: req.query.time_zone,
		form: req.query.form_input 
	}
	if (query.frequency === 'WEEKLY') {
		let tenant_info = utils.weeklyPayment(query);
		 //res.send(tenant_info);
		data = tenant_info;
		(query.form===undefined)? res.send(tenant_info):res.redirect('/table/tenant_info');
		
	} else if (query.frequency === 'FORTNIGHTLY') {
		let tenant_info = utils.fortnightPayment(query);
		//res.send(tenant_info);
		data = tenant_info;
		//res.redirect('/table/tenant_info');
		(query.form===undefined)? res.send(tenant_info):res.redirect('/table/tenant_info');
	} else if (query.frequency === 'MONTHLY') {
		let tenant_info = utils.monthlyPayment(query);
		//res.send(tenant_info);
		data = tenant_info;
		//res.redirect('/table/tenant_info');
		(query.form===undefined)? res.send(tenant_info):res.redirect('/table/tenant_info');
	}
});
app.get('/table/tenant_info', (req, res, next) => {
	res.render('./views/table.html', { data: data });
});
app.listen(3000, () => {
	console.log('Server running on port 3000');
});

