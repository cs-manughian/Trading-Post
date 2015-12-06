/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./server/routes/index');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({secret: 's3a45lv76py0w9q2yt43', expires: new Date(Date.now() + 60 * 100000)}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
})); 
app.use(express.urlencoded());   // to support URL-encoded bodies
app.use( bodyParser.json() );    // to support JSON-encoded bodies
app.use(express.json());         // to support JSON-encoded bodies

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// dynamically include routes
routes(app);


// server
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port') + ' address '+ server.address().address);
});

