'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var http = require('http');
var https = require('https');
var app = module.exports = loopback();
var fs  = require('fs');
var path = require('path');
var debug = require('debug');

app.start = function(cb) {
  // start the web server
  var sslConfig = app.get('sslConfig');
  var httpOnly = app.get('httpOnly');
  var server=null;
  if(!httpOnly){
    var options = {
              key: fs.readFileSync(path.join(__dirname, sslConfig.privateKey)).toString(),
              cert: fs.readFileSync(path.join(__dirname, sslConfig.certificate)).toString()
    };
    server = https.createServer(options, app);
  }else{
    server = http.createServer(app);
  }
 // start the web server
  server.listen(app.get('port'), function () {
      var baseUrl = (httpOnly ? 'http://' : 'https://') + app.get('host') + ':' + app.get('port');
      app.emit('started', baseUrl);
      debug('LoopBack server listening @ %s%s', baseUrl, '/');
      if (app.get('loopback-component-explorer')) {
          var explorerPath = app.get('loopback-component-explorer').mountPath;
          debug('Browse your REST API at %s%s', baseUrl, explorerPath);
      }
      cb && cb();
  });
  return server;
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
    console.log('CONTENT SERVICE STARTED ********************* ');
});
