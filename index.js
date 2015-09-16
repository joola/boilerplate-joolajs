var
  express = require('express'),
  path = require('path'),
  fs = require('fs'),
  config = require('config'),
  joola = require('joola');

//set trace logging
process.env.JOOLA_CONFIG_STORE_LOGGER_CONSOLE_LEVEL = 'trace';

//construct the express app
var app = express();
app.set('view engine', 'jade');

//in case allow origin is required
/*
var allowDomain = config.get('site.alloworigin') || null;

var allowCrossDomain = function (req, res, next) {
  if (allowDomain)
    res.header('Access-Control-Allow-Origin', allowDomain);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);
*/
//attach the public folder for static content
app.use(express.static(path.join(__dirname, 'public')));

//fireup joola and attach the express app
joola.init({
  webserver_app: app
}, function(err, ref) {
  if (err)
    throw err;

  global.joola = ref;
  var env = (process.env.NODE_ENV || 'development');
  joola.logger.info('Analytics Wireframe is ready, environment: ' + env + '.');
});
