var express = require('express')
	, stylus = require('stylus')
	, nib = require('nib');
var app = express();

var sendgrid  = require('sendgrid')(
  process.env.SENDGRID_USERNAME,
  process.env.SENDGRID_PASSWORD
);

function compile(str,path){
	return stylus(str)
		.set('filename',path)
		.use(nib());
}
app.set('views',__dirname+'/views');
app.set('view engine', 'jade');
app.use(stylus.middleware(
	{
	src: __dirname+'/public',
	compile:compile
}));
app.use(express.bodyParser());
app.use(express.static(__dirname+'/public'));

app.get('/', function(req,res){
	res.render('index',
		{title:'Latch'});
});

app.post('/email', function(req, res) { 

	var fromMail = req.body.email; 
	sendgrid.send({
		to: 'contact@getlatch.com',
		from: fromMail,
		subject: 'Hello World',
		text: 'Sending email with NodeJS through SendGrid!'
	}, function(err, json) {
		if (err) { 
			return console.error(err); 
		}
		console.log(json);
	});


});

var port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log("Listening on " + port);
});