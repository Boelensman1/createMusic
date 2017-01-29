const express = require('express');
const Primus = require('primus');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');

const server = require('http').createServer(app);
const primus = new Primus(server);

const MPC = require('mpc-js').MPC;
const mpc = new MPC();

app.set('mpc', mpc);

app.set('port', process.env.PORT || 3030);
// app.use(express.logger('dev'));
app.use(bodyParser.json())
app.use(require('express-promise')());

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}

primus.on('connection', function connection(spark) {
    console.log('new connection');
    spark.write({ Welcome: 'Hello!' });
});

const playlistRoute = require('./routes/playlist');
app.use(playlistRoute);


mpc.connectTCP('mainpc', 6600);
mpc.on('ready', () => {
  console.log('Connection to mpd established');
  server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});
