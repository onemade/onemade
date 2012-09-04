
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

/* 频道参数 传值path*/
var path = "/News/zzxw/xwzx/tpxw";
//app.get('/channel/:path', function(req, res){
app.get('/channel/*', function(req, res){
  //res.send('channel path = ' + path);
  //path = req.params.path;
  //path = path.replace(/_/ig,'/');
  path = req.params[0];
  var getSource = require('./getSource');
  getSource.start(res, path);
});

var page = "";
app.get('/read/*', function(req, res){
  console.log(req.params);
  page = req.params[0];
  //page = page.replace(/_/ig, '/');
  var readability = require('./package.readability.js');
  readability.start(res, page);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
