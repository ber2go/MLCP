var express = require('express'),
	logger  = require('morgan');

var environment = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('*', function(req, res){
	res.render('quotation');
});
 
var port = 3030;
app.listen(port);
console.log('Listening to port ' + port + '...');