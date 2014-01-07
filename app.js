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

	console.log("----sendgrid username");
	console.log(process.env.SENDGRID_USERNAME);

	sendgrid.send({
		to: 'shogun042@gmail.com',
		from: fromMail,
		subject: 'Hello World Latch',
		text: 'Sending email with NodeJS through SendGrid!'
	}, function(err, json) {
		if (err) { 
			console.log("i'm an error");
			return console.error(err); 
		}
		console.log(json);
		res.send("it worked!");
	});


});

var port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log("Listening on " + port);
});