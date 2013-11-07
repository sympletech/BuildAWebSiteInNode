
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var app = express();
var appSecurity = require('./my_modules/app-security');
var passport = require('passport');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser('I Like Cookies!'));
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.logger('dev'));
app.use(express.methodOverride());

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

appSecurity.init();

// Routes
routes.RegisterAppRoutes(app);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
