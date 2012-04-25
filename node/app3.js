
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes/route2.js');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/../public'));  
  app.use(express.static(__dirname + '/../part3'));  
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/api/wines/:id?', routes.wineGet);
app.post('/api/wines/:id?', routes.wineCreate);
app.del('/api/wines/:id?', routes.wineDelete);
app.put('/api/wines/:id?', routes.wineUpdate);
app.get('/api/*', function(req, res) {
  // unsupported API
  res.send(false);
});

// starts yo!
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
