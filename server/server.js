var express = require('express');
var WebSocketServer = require('websocket').server;
var bodyParser = require('body-parser');
var connections = require('./routes');

var app = express();

app.use(express.static(__dirname + './../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', connections);
app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});

connections.wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true // Dont do it in production!
});

console.log("Todo app is ready");
