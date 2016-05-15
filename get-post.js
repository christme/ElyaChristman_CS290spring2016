//***********************************************************************************
// Elya Christman
// CS 290, Spring 2016
// get_post.js - script that determines whether a sent request was get or post
//***********************************************************************************

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/homePage', function(req,res)
{
	var params = [];
	for (var p in req.query)
	{
		params.push(p + ": " + req.query[p]);
	}
	var context = {};
	context.dataList = params;
	res.render('getpage', context);
});

app.post('/homePage', function(req, res)
{
	var params = [];
	for (var p in req.body)
	{
		params.push(p + ": " + req.body[p]);
	}
	var context = {};
	context.dataList = params;
	res.render('postpage', context);
}); 

app.use(function(req,res)
{
	res.status(404);
  	res.render('404');
});

app.use(function(err, req, res, next)
{
	console.error(err.stack);
	res.type('plain/text');
  	res.status(500);
  	res.render('500');
});

app.listen(app.get('port'), function()
{
  	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

