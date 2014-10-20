var express = require('express'),
    logger = require('morgan'),
    mongoose = require('mongoose');

var environment = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

// Add connection here.
mongoose.connect('');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('mlcp-dev db opened');

});

var messageSchema = mongoose.Schema({
    message: String
});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
    console.log(messageDoc.message);
    mongoMessage = messageDoc.message;
});



app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', function(req, res) {

    res.render('quotation');
});

var port = 3030;
app.listen(port);
console.log('Listening to port ' + port + '...');



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

router.route('/message')

// create a bear (accessed at POST http://localhost:8080/api/bears)
.get(function(req, res) {

    // save the bear and check for errors
    Message.findOne().exec(function(err, messageDoc) {
      res.json(messageDoc);
});

});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
